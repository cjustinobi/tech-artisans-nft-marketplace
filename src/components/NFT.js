import {IPFS_URL} from "../utils";


const NFT = ({ nft }) => {
  return <div class="flex flex-wrap w-1/3">      <p>{nft.name}</p>

    <div class="w-full p-1 md:p-2">
      <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg" src={`${IPFS_URL}${nft.image}`} />
    </div>
  </div>
}

export default NFT