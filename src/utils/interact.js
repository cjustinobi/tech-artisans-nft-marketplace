import { getNFTMeta } from './ipfs'
import {formatPrice, priceToWei} from "./helpers";

export const nftContractAddress = '0x816C9E7d831e98302dAd9231CeB10Cf7AE28806A'

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

        console.log('owner ', await NFTContract.methods.ownerOf(i).call())
        // console.log('balanceOf ', await NFTContract.methods.balanceOf(NFTItem._seller).call())
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

export const buyNFT = async (NFTContract, NFT, address, kit) => {
  const NFTCount = await NFTContract.methods.buyNFT(NFT.tokenId).send({
    from: address,
    value: NFT.price
    // value: priceToWei(kit, NFT.price)
  })


}

export const sellNFT = async (NFTContract, tokenId, address) => {

  const listPrice = await NFTContract.methods.getListPrice().call()

  const trans = await NFTContract.methods.sellNFT(tokenId).send({
    from: address,
    value: listPrice
  })

  console.log(trans)
return trans
}

export const cancelNFT = async (NFTContract, tokenId, address) => {

  return await NFTContract.methods.cancel(tokenId).send({
    from: address
  })

}

export const getMyNFTs = async (NFTContract, address) => {
  try {
    // debugger
    const transLength = await NFTContract.methods.getMyNFTCount(address).call()

    let NFTs = []

    for (let i = 0; i < transLength; i++) {
      const NFT = new Promise(async resolve => {
        const NFTItem = await NFTContract.methods.getMyNFTs(i, address).call()

        const NFTURI = await NFTContract.methods.tokenURI(NFTItem._NFTId).call()

        const NFTMeta = await getNFTMeta(NFTURI)

        resolve({
          tokenId: NFTItem._NFTId,
          price: NFTItem._price,
          seller: NFTItem._seller,
          forSale: NFTItem._forSale,
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
    console.log(e)
  }
}