
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import {
  IPFS_URL,
  formatPrice,
  nftContractAddress,
  buyNFT,
  sellNFT,
  cancelNFT,
  toCheckSum,
  truncate
} from '../utils'
import { useCelo } from '@celo/react-celo'
import { LoaderContext } from '../contexts/AppContext'
import { useContract } from '../hooks'
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'


const NFTCard = ({ nft, updateUI }) => {

  const location = useLocation()

  const { setLoading } = useContext(LoaderContext)

  const NFTContract = useContract(NFTMarketplace.abi, nftContractAddress)

  const { kit, address } = useCelo()

  const buyNFTHandler = async nft => {
    setLoading(true)
    await buyNFT(NFTContract, nft, address, kit)
    setLoading(false)
    updateUI()
  }

  const sellNFTHandler = async (nft) => {
    setLoading(true)
    await sellNFT(NFTContract, nft.tokenId, address, nft.price, kit)
    setLoading(false)
    updateUI()
  }

  const cancelNFTHandler = async (tokenId) => {
    await cancelNFT(NFTContract, tokenId, address)
    updateUI()
  }

  return <div className="flex flex-col sm:w-1/3 p-4 bg-gray-50">
    <div className="w-full h-full md:p-2">
      <img alt="gallery" className="block object-cover object-center w-full rounded-lg" src={`${IPFS_URL}${nft.image}`} />
    </div>

    <div className="flex space-x-4 py-2">
      <span className="w-2/3 font-bold">{nft.name}</span>
      <span className="w-1/3">{formatPrice(kit, nft.price)} CELO</span>
    </div>

    {location.pathname === '/' && <div className="flex flex-col py-2">
      <span className="font-bold">{truncate(nft.seller)}</span>
      <span>Sold: {nft.sales}</span>
      <span>Earnings: {formatPrice(kit, nft.earnings)}</span>
    </div>}

    {nft.forSale === true && nft.seller !== toCheckSum(kit, address) && (
      <button onClick={() => buyNFTHandler(nft)} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        Buy NFT
      </button>
    )}

    {nft.forSale === false && nft.seller === toCheckSum(kit, address) && (
      <button onClick={() => sellNFTHandler(nft)} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        Sell NFT
      </button>
    )}

    {nft.forSale === true && nft.seller === toCheckSum(kit, address) && (
      <button onClick={() => cancelNFTHandler(nft.tokenId)} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        Cancel
      </button>
    )}

  </div>
}

export default NFTCard