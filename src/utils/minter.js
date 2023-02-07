// mint an NFT
export const createNft = async (
  minterContract,
  marketplaceContract,
  performActions,
  { name, price, description, ipfsImage, ownerAddress }
) => {
  await performActions(async (kit) => {
    if (!name || !description || !ipfsImage) return;
    const { defaultAccount } = kit;

    // convert NFT metadata to JSON format
    const data = JSON.stringify({
      name,
      description,
      image: ipfsImage,
      owner: defaultAccount,
    });

    try {
      // save NFT metadata to IPFS
      const files = makeFileObjects(data, name);
      const file_cid = await upload(files);

      // IPFS url for uploaded metadata
      const url = `https://${file_cid}.ipfs.w3s.link/${name}.json`;

      // mint the NFT and save the IPFS url to the blockchain
      let transaction = await minterContract.methods
        .createNFT(url)
        .send({ from: defaultAccount });

      let tokenCount = BigNumber.from(
        transaction.events.Transfer.returnValues.tokenId
      );

      const NFTprice = ethers.utils.parseUnits(String(price), "ether");
      console.log(NFTprice);

      await minterContract.methods
        .approve(NFTMarketplaceContractAddress.NFTMarketplace, tokenCount)
        .send({ from: kit.defaultAccount });

      await marketplaceContract.methods
        .listNFT(MyNFTContractAddress.MyNFT, tokenCount, NFTprice)
        .send({ from: defaultAccount });

      return transaction;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  });
};