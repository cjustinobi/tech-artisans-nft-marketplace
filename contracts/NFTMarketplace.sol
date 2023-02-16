//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721, ERC721Enumerable, ERC721URIStorage {

    using Counters for Counters.Counter;

    // _NFTIdCounter variable has the most recent minted tokenId
    Counters.Counter private _NFTIdCounter;

    // Keeps track of the number of items sold on the marketplace
    Counters.Counter private _itemsSold;

    // Owner is the contract address that created the smart contract
    address payable owner;

    // The fee charged by the marketplace to be allowed to list an NFTCard
    uint256 listPrice = 0.01 ether;

    // The structure to store info about a listed token
    struct ListedNFT {
        uint256 NFTId;
        address payable seller;
        uint256 price;
        bool forSale;
    }

    struct Seller {
        uint256 sales;
        uint256 earnings;
    }

    // The event emitted when a token is successfully listed
    event NFTListedSuccess (
        uint256 indexed tokenId,
        address seller,
        uint256 price,
        bool forSale
    );

    // This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => ListedNFT) private idToListedNFT;

    mapping(address => ListedNFT[]) myNFTs;

    mapping(address => Seller) sellers;

    mapping(address => bool) public sellerExist;

    constructor() ERC721("ArtisansNFTMarketplace", "ANTMKT") {
        owner = payable(msg.sender);
    }

    // Required overrides functions

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    // Required overrides functions ends here

    function updateListPrice(uint256 _listPrice) public payable {
        require(owner == msg.sender, "Only owner can update listing price");
        listPrice = _listPrice;
    }

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function getNFT(uint256 NFTId) public view returns (
        uint256 _NFTId,
        //address _owner,
        address _seller,
        uint256 _price,
        bool _forSale,
        uint256 _sales,
        uint256 _earnings
    ) {
        ListedNFT memory _nft = idToListedNFT[NFTId];

        Seller memory _NFTseller = sellers[_nft.seller];

        return (
        _nft.NFTId,
        //_nft.owner,
        _nft.seller,
        _nft.price,
        _nft.forSale,
        _NFTseller.sales,
        _NFTseller.earnings
      );
    }

    function getNFTCount() public view returns (uint256) {
        return _NFTIdCounter.current();
    }

    //The first time a token is created, it is listed here
    function createNFT(string memory NFTURI, uint256 price) public payable returns (uint) {

        //Increment the tokenId counter, which is keeping track of the number of minted NFTs
        _NFTIdCounter.increment();

        uint256 newNFTId = _NFTIdCounter.current();

        //Mint the NFTCard with tokenId newTokenId to the address who called createToken
        _safeMint(msg.sender, newNFTId);

        //Map the tokenId to the NFTURI (which is an IPFS URL with the NFTCard metadata)
        _setTokenURI(newNFTId, NFTURI);

        idToListedNFT[newNFTId] = ListedNFT(newNFTId, payable(msg.sender), price, false );

        return newNFTId;
    }

    function createListedNFT(uint256 NFTId, uint256 price) private {
        // Make sure the sender sent enough ETH to pay for listing
        require(msg.value == listPrice, "Hopefully sending the correct price");
        // Just sanity check
        require(price > 0, "Make sure the price isn't negative");

        // Update the mapping of tokenId's to Token details, useful for retrieval functions.

        idToListedNFT[NFTId] = ListedNFT(
            NFTId,
            payable(msg.sender),
            price,
            true
        );

        myNFTs[msg.sender].push(ListedNFT(NFTId, payable(msg.sender), price, true));

        _transfer(msg.sender, address(this), NFTId);
        //Emit the event for successful transfer. The frontend parses this message and updates the end user

    }

    function getMyNFTs (uint256 _index, address _callerAddress) public view returns (

        uint256 _NFTId,
        //address _owner,
        address _seller,
        uint256 _price,
        bool _forSale
    ) {


      ListedNFT storage _myNFTs = myNFTs[_callerAddress][_index];

      return (
      _myNFTs.NFTId,
      //_myNFTs.owner,
      _myNFTs.seller,
      _myNFTs.price,
      _myNFTs.forSale
      );
    }



    function buyNFT(uint256 tokenId) public payable {
      ListedNFT storage _nft = idToListedNFT[tokenId];
      address seller = idToListedNFT[tokenId].seller;
        require(msg.value == _nft.price, "Please submit the asking price in order to complete the purchase");

        // Update the details of the token.
        _nft.forSale = false;
        _nft.seller = payable(msg.sender);
        _itemsSold.increment();

        // Actually transfer the token to the contract.
        _transfer(address(this), msg.sender, tokenId);

        // Approve the marketplace to sell NFTs on your behalf.
         //approve(msg.sender, tokenId);



        // Transfer the proceeds from the sale to the seller of the NFTCard.
        payable(seller).transfer(msg.value);

        myNFTs[msg.sender].push(ListedNFT(tokenId, payable(msg.sender), _nft.price, false));

        Seller storage _seller = sellers[seller];
        _seller.sales ++;
        _seller.earnings += _nft.price;
    }

    function sellNFT(uint256 tokenId) public payable {
             ListedNFT storage _nft = idToListedNFT[tokenId];
             require(_nft.price > 0, "Make sure the price isn't negative");
             require(msg.value == listPrice, "Hopefully sending the correct price");
             require(_nft.seller == msg.sender, "Only NFT owners can perform this operation");
             require(_nft.forSale == false, "Item already listed for sale");

             // Transfer the listing fee to the marketplace creator.
             payable(owner).transfer(listPrice);
             _transfer(msg.sender, address(this), tokenId);
             _nft.forSale = true;

             emit NFTListedSuccess(
                         tokenId,
                         msg.sender,
                         _nft.price,
                         true
                     );
          }

    function cancel(uint256 tokenId) public {
         ListedNFT storage _nft = idToListedNFT[tokenId];
         require(_nft.seller == msg.sender, "Only NFT owners can perform this operation");
         require(_nft.forSale == true, "Item not listed for sale");

         _transfer(address(this), msg.sender, tokenId);
         _nft.forSale = false;
      }
}
