import {useEffect} from "react";
import { getNfts, nftContractAddress } from "../utils";
import { useContract } from "../hooks";
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'


const NFTs = () => {

  const NFTContract = useContract(NFTMarketplace.abi, nftContractAddress)

  useEffect(() => {
    const getNFTsHandler = async () => {
      const res = await getNfts(NFTContract)
      console.log(res)
    }

    getNFTsHandler()
  })


  return (
    <section class="overflow-hidden text-gray-700 ">
      <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
        <div class="flex flex-wrap -m-1 md:-m-2">
          <div class="flex flex-wrap w-1/3">
            <div class="w-full p-1 md:p-2">
              <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                   src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp" />
            </div>
          </div>
          <div class="flex flex-wrap w-1/3">
            <div class="w-full p-1 md:p-2">
              <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                   src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp" />
            </div>
          </div>
          <div class="flex flex-wrap w-1/3">
            <div class="w-full p-1 md:p-2">
              <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                   src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp" />
            </div>
          </div>
          <div class="flex flex-wrap w-1/3">
            <div class="w-full p-1 md:p-2">
              <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                   src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp" />
            </div>
          </div>
          <div class="flex flex-wrap w-1/3">
            <div class="w-full p-1 md:p-2">
              <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                   src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp" />
            </div>
          </div>
          <div class="flex flex-wrap w-1/3">
            <div class="w-full p-1 md:p-2">
              <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg"
                   src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


export default NFTs