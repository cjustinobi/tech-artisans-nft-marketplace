import { getNFTMeta } from './ipfs'

export const nftContractAddress = '0x9C0767B1a34d327396E0267B3D3e7f45534519E5'

export const getNfts = async (NFTContract) => {
  try {

    const NFTs = []
    const NFTCount = await NFTContract.methods.getNFTCount().call()

    for (let i = 1; i <= NFTCount; i++) {
      const NFT = new Promise(async (resolve) => {

        const NFTItem = await NFTContract.methods.getNFT(i).call()
        const NFTURI = await NFTContract.methods.tokenURI(i).call()

        const NFTMeta = await getNFTMeta(NFTURI)

        resolve({
          tokenId: NFTItem.NFTId,
          price: NFTItem.price,
          seller: NFTItem.seller,
          forSale: NFTItem.forSale,
          name: NFTMeta.name,
          image: NFTMeta.image,
          initialPrice: NFTMeta.price,
          description: NFTMeta.description,
        })
      })
      NFTs.push(NFT)
    }
    return Promise.all(NFTs)
  } catch (e) {
    console.log({ e })
  }
}

export const buyNFT = async (NFTContract, tokenId) => {

  const NFTCount = await NFTContract.methods.buyNFT(tokenId).send({

  })


}

export const sellNFT = async (NFTContract, tokenId, address, price, kit) => {

  const trans = await NFTContract.methods.saleNFT(tokenId).send({
    from: address,
    value: price
  })
  console.log('seell tran ', trans)

}

export const cancelNFT = async (NFTContract, tokenId, address) => {

  const trans = await NFTContract.methods.cancel(tokenId).send({
    from: address
  })
  console.log(trans)

}