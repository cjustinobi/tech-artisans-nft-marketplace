import { useState, useEffect } from 'react'
import { getNfts, nftContractAddress } from '../utils'
import { useContract } from '../hooks'
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import NFTCard from './NFTCard'


const NFTs = () => {

  const [NFTs, setNFTs] = useState(undefined)

  const NFTContract = useContract(NFTMarketplace.abi, nftContractAddress)

  const updateUI = () => {
    alert('inside update ui')
    getNFTsHandler()
  }
  const getNFTsHandler = async () => {
    const NFTs = await getNfts(NFTContract)
    console.log('nfts ', NFTs)
    setNFTs(NFTs)
  }
  useEffect(() => {
    // const getNFTsHandler = async () => {
    //   const NFTs = await getNfts(NFTContract)
    //   console.log('nfts ', NFTs)
    //   setNFTs(NFTs)
    // }

    getNFTsHandler()
  }, [NFTContract])


  return (
    <section class="overflow-hidden text-gray-700 ">
      <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
        <div class="flex flex-wrap -m-1 md:-m-2">
          {NFTs && NFTs.map(nft => <NFTCard nft={nft} key={nft.tokenId} updateUI={updateUI} />)}
        </div>
      </div>
    </section>
  )
}


export default NFTs