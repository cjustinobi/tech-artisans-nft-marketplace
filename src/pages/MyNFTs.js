import {useState, useEffect, useContext} from 'react'
import { useCelo } from '@celo/react-celo'
import { LoaderContext } from '../contexts/AppContext'
import { getMyNFTs, nftContractAddress } from '../utils'
import { useContract } from '../hooks'
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import NFTCard from '../components/NFTCard'


const MyNFTs = () => {

  const { address } = useCelo()

  const { setLoading } = useContext(LoaderContext)

  const [NFTs, setNFTs] = useState(undefined)

  const NFTContract = useContract(NFTMarketplace.abi, nftContractAddress)

  const updateUI = () => {
    getMyNFTsHandler()
  }
  const getMyNFTsHandler = async () => {
    setLoading(true)
    const NFTs = await getMyNFTs(NFTContract, address)
    setLoading(false)
    setNFTs(NFTs)
  }
  useEffect(() => {

    getMyNFTsHandler()
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


export default MyNFTs