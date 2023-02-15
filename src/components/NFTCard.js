import {
  IPFS_URL,
  formatPrice,
  nftContractAddress,
  buyNFT,
  saleNFT,
  cancelNFT,
  toCheckSum
} from '../utils'
import { useCelo } from '@celo/react-celo'
import {useContract} from '../hooks'
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'




const NFTCard = ({ nft, updateUI }) => {

  const NFTContract = useContract(NFTMarketplace.abi, nftContractAddress)

  const { kit, address } = useCelo()

  const saleNFTHandler = async (nft) => {
    const res = await saleNFT(NFTContract, nft.tokenId, address, nft.price, kit)
    console.log('sell ', res)
    if (res) {
      updateUI()
    }
  }

  const cancelNFTHandler = async (tokenId) => {
    const res = await cancelNFT(NFTContract, tokenId, address)
    console.log(res)
    if (res) {
      updateUI()
    }
  }

  return <div className="flex flex-col sm:w-1/3">
    <div className="w-full h-full p-1 md:p-2">
      <img alt="gallery" className="block object-cover object-center w-full rounded-lg" src={`${IPFS_URL}${nft.image}`} />
    </div>
    <p className="px-4 py-2">{nft.name}</p>
    <p className="px-4 py-2">{formatPrice(kit, nft.price)} CELO</p>

    {nft.forSale === true && nft.seller !== toCheckSum(kit, address) && (
      <button onClick={() => buyNFT(NFTContract, nft, address, kit)} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        Buy NFT
      </button>
    )}

    {nft.forSale === false && nft.seller === toCheckSum(kit, address) && (
      <button onClick={() => saleNFTHandler(nft)} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        Sell NFT
      </button>
    )}

    {nft.forSale === true && nft.seller === toCheckSum(kit, address) && (
      <button onClick={() => cancelNFTHandler(nft.tokenId)} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        Cancel
      </button>
    )}

  </div>
}

export default NFTCard