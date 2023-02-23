import {useState, useEffect, useCallback} from 'react'
import { getNfts, nftContractAddress } from '../utils'
import { useContract } from '../hooks'
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import NFTCard from './NFTCard'


const NFTs = () => {

  const [NFTs, setNFTs] = useState(undefined)

  const NFTContract = useContract(NFTMarketplace.abi, nftContractAddress)

  const updateUI = () => {
    getNFTsHandler()
  }

  const getNFTsHandler = useCallback(async () => {

    let NFTs = await getNfts(NFTContract)
    if (NFTs.length) {
      NFTs = NFTs.filter(NFT => NFT.forSale)
      setNFTs(NFTs)
    }

  }, [setNFTs, getNfts, NFTContract])

  useEffect(() => {

    getNFTsHandler()
  }, [NFTContract, getNFTsHandler])


  return (
    <section className="overflow-hidden text-gray-700">
      <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
        <div className="flex flex-wrap -m-1 md:-m-2">
          {NFTs && NFTs.map(nft => <NFTCard nft={nft} key={nft.tokenId} updateUI={updateUI} />)}
          {NFTs && NFTs.length === 0 && (<p>No Items found</p>)}
        </div>
      </div>
    </section>
  )
}


export default NFTs