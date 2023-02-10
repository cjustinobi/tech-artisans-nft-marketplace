import { getNFTMeta } from './ipfs'

export const nftContractAddress = '0xdc7C33faFd8ae1B15052B4530DBB15e7ff997192'

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