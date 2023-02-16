import { getNFTMeta } from './ipfs'
import {formatPrice} from "./helpers";

export const nftContractAddress = '0x10b0b6a4dA5F1aC13B6d7CFD8f064B2f05C75d0a'

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

export const buyNFT = async (NFTContract, NFT, address, kit) => {
  const NFTCount = await NFTContract.methods.buyNFT(NFT.tokenId).send({
    from: address,
    value: NFT.price
    // value: priceToWei(kit, NFT.price)
  })


}

export const sellNFT = async (NFTContract, tokenId, address, price, kit) => {

  const listPrice = await NFTContract.methods.getListPrice().call()

  const trans = await NFTContract.methods.sellNFT(tokenId).send({
    from: address,
    value: listPrice
  })
  console.log('seell tran ', trans)

}

export const cancelNFT = async (NFTContract, tokenId, address) => {

  const trans = await NFTContract.methods.cancel(tokenId).send({
    from: address
  })
  console.log(trans)

}