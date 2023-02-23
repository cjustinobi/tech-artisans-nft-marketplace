import { getNFTMeta } from './ipfs'

export const nftContractAddress = '0x1f08cb18155Dc80ceCD8C93AC3b345361ce3661A'

export const createNFT = async (NFTContract, NFTURI, price, address) => {
  try {
    return await NFTContract.methods.createNFT(NFTURI, price).send({from: address})
  } catch (e) {
    console.log(e)
  }
}

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
          tokenId: NFTItem._NFTId,
          price: NFTItem._price,
          seller: NFTItem._seller,
          forSale: NFTItem._forSale,
          sales: NFTItem._sales,
          earnings: NFTItem._earnings,
          name: NFTMeta.name,
          image: NFTMeta.image,
          initialPrice: NFTMeta.price,
          description: NFTMeta.description
        })
      })
      NFTs.push(NFT)
    }
    return Promise.all(NFTs)
  } catch (e) {
    console.log({ e })
  }
}

export const buyNFT = async (NFTContract, NFT, address) => {
  return await NFTContract.methods.buyNFT(NFT.tokenId).send({
    from: address,
    value: NFT.price
  })

}

export const sellNFT = async (NFTContract, tokenId, address) => {

  const listPrice = await NFTContract.methods.getListPrice().call()

  return await NFTContract.methods.sellNFT(tokenId).send({
    from: address,
    value: listPrice
  })

}

export const cancelNFT = async (NFTContract, tokenId, address) => {

  return await NFTContract.methods.cancel(tokenId).send({
    from: address
  })

}

export const getMyNFTs = async (NFTContract, address) => {
  try {

    const NFTCount = await NFTContract.methods.getMyNFTCount(address).call()

    let NFTs = []

    for (let i = 1; i < NFTCount; i++) {
      const NFTItem = await NFTContract.methods.getMyNFTs(i, address).call()

      if (NFTItem._sold) {
        continue
      }

      const NFTURI = await NFTContract.methods.tokenURI(NFTItem._NFTId).call()

      const NFTMeta = await getNFTMeta(NFTURI)

      NFTs.push({
        tokenId: NFTItem._NFTId,
        price: NFTItem._price,
        seller: NFTItem._seller,
        forSale: NFTItem._forSale,
        name: NFTMeta.name,
        image: NFTMeta.image,
        initialPrice: NFTMeta.price,
        description: NFTMeta.description,
      })
    }

    return NFTs

  } catch (e) {
    console.log(e)
  }
}

export const getSellerStat = async (NFTContract, address) => {
  return await NFTContract.methods.getSellerStat(address).call()
}