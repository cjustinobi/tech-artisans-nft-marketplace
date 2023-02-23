import {useState, useEffect, useContext} from 'react'
import { useCelo } from '@celo/react-celo'
import { LoaderContext } from '../contexts/AppContext'
import {formatPrice, getMyNFTs, getSellerStat, nftContractAddress} from '../utils'
import { useContract } from '../hooks'
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import NFTCard from '../components/NFTCard'


const MyNFTs = () => {

  const { address, kit } = useCelo()

  const { setLoading } = useContext(LoaderContext)

  const [stats, setStats] = useState({_sales: 0, _earnings: 0})
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

  const getStat = async () => {
    setLoading(true)
    const stats = await getSellerStat(NFTContract, address)
    setLoading(false)
    setStats(stats)
  }

  useEffect(() => {

    getMyNFTsHandler()
    getStat()
  }, [NFTContract])


  return (
    <section class="overflow-hidden text-gray-700 ">
      <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
        <div className="flex w-full flex-wrap justify-center">
          <div
            data-te-chip-init
            data-te-ripple-init
            className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] items-center justify-between rounded-[16px] bg-[#eceff1] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none dark:bg-neutral-600 dark:text-neutral-200"
            data-te-close="true">
            Sales: {stats._sales}
          </div>
          <div
            data-te-chip-init
            data-te-ripple-init
            className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] items-center justify-between rounded-[16px] bg-[#eceff1] py-0 px-[12px] text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none dark:bg-neutral-600 dark:text-neutral-200"
            data-te-close="true">
            Earnings: {formatPrice(kit, stats._earnings)}
          </div>
        </div>
        <div class="flex flex-wrap -m-1 md:-m-2">
          {NFTs && NFTs.map(nft => <NFTCard nft={nft} key={nft.tokenId} updateUI={updateUI} />)}
          {NFTs && NFTs.length === 0 && (<p>No Items found</p>)}
        </div>
      </div>
    </section>
  )
}


export default MyNFTs