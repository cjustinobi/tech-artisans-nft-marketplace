import { IPFS_URL, formatPrice } from '../utils'
import { useCelo } from '@celo/react-celo'


const NFTCard = ({ nft }) => {

  const { kit } = useCelo()

  return <div class="flex flex-col sm:w-1/3">
    <div class="w-full h-full p-1 md:p-2">
      <img alt="gallery" className="block object-cover object-center w-full rounded-lg" src={`${IPFS_URL}${nft.image}`} />
    </div>
    <p class="px-4 py-2">{nft.name}</p>
    <p class="px-4 py-2">{formatPrice(kit, nft.price)} CELO</p>
  </div>
}

export default NFTCard