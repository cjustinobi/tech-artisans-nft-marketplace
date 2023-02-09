
export const nftContractAddress = '0x16bC29E54696a7890Ed354FD39411A6c2796CB82'

export const getNfts = async (NFTContract) => {
  try {
    const nfts = [];
    const NFTCount = await NFTContract.methods.getNFTCount().call()
    // contract starts minting from index 1
    for (let i = 1; i <= NFTCount; i++) {
      const nft = new Promise(async (resolve) => {
        const listing = await NFTContract.methods.getNFT(i).call();
        // const res = await NFTContract.methods.tokenURI(i).call();
        // const meta = await fetchNftMeta(res);

        resolve(listing)
        // resolve({
        //   index: i,
        //   nft: listing.nft,
        //   tokenId: listing.tokenId,
        //   price: listing.price,
        //   seller: listing.seller,
        //   forSale: listing.forSale,
        //   owner: meta.owner,
        //   name: meta.name,
        //   image: meta.image,
        //   description: meta.description,
        // });
      });
      nfts.push(nft);
    }
    return Promise.all(nfts);
  } catch (e) {
    console.log({ e });
  }
}