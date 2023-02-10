import { useState, useEffect } from 'react'
import { getNfts, nftContractAddress } from '../utils'
import { useContract } from '../hooks'
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import NFT from './NFT'


const NFTs = () => {

  const [NFTs, setNFTs] = useState(undefined)

  // description
  //   :
  //   "how"
  // forSale
  //   :
  //   true
  // image
  //   :
  //   "bafkreigvtjkfpx5lcmidx2surnyeauluzwab3zi4gigd4qum4w7ytshdmu"
  // initialPrice
  //   :
  //   "0.0272"
  // name
  //   :
  //   "test-upkeep"
  // price
  //   :
  //   "27200000000000000"
  // seller
  //   :
  //   "0x9Edd3fb21e1BC3dBE3c5BCf8AB8044c706AAEA9C"
  // tokenId
  //   :
  //   "1"

  const NFTContract = useContract(NFTMarketplace.abi, nftContractAddress)

  useEffect(() => {
    const getNFTsHandler = async () => {
      const NFTs = await getNfts(NFTContract)
      setNFTs(NFTs)
    }

    getNFTsHandler()
  })


  return (
    <section class="overflow-hidden text-gray-700 ">
      <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
        <div class="flex flex-wrap -m-1 md:-m-2">
          {NFTs && NFTs.map(nft => <NFT nft={nft}  key={nft.tokenId} />)}
        </div>
      </div>
    </section>
  )
}


export default NFTs