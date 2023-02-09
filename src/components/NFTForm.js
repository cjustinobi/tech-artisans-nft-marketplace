import { useState, useContext, useEffect } from 'react'
import { useContract } from '../hooks'
import {
  imageToIPFS,
  JSONToIPFS,
  nftContractAddress,
  formatPrice,
  LIST_PRICE
} from '../utils'
import {LoaderContext, NotificationContext} from '../contexts/AppContext'
import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import {useCelo} from "@celo/react-celo"



const NFTForm = () => {

  const { kit, address } = useCelo()
console.log(kit.connection)
  const nftContract = useContract(NFTMarketplace.abi, nftContractAddress)

  const { notification, setNotification } = useContext(NotificationContext)
  const { setLoading } = useContext(LoaderContext)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('default')
  const [image, setImage] = useState('')

  const createNFT = async () => {

    if (!address) return setNotification({message: 'Connect wallet to continue', success: false})

    if (isNotValid()) return setNotification({message: 'All fields are required', success: false})

    setLoading(true)

    document.getElementById('nft-form').style.display = 'none'

    let CID = new Promise(async resolve => {
      const res = await imageToIPFS(image)
      resolve(res)
    })

    CID = await CID

    const nftJson = {
      name,
      price,
      description,
      image: CID
    }

    const nftURI = await JSONToIPFS(nftJson)

    try {
      await nftContract.methods.createNFT(nftURI, formatPrice(kit, price)).send({
        from: address,
        value: formatPrice(kit, LIST_PRICE)
      })

      setLoading(false)
      setNotification({message: 'NFT successfully created', success: true})
    } catch (e) {
      setLoading(false)
      setNotification({message: e.getMessage(), success: false})
    }
  }


  const isNotValid = () => {
    let res = false
    if (
      name === '' ||
      description === '' ||
      image === '' ||
      price === ''
    ) {
      res = true
    }

    return res
  }

  const resetForm = () => {
    setName('')
    setImage('')
    setPrice('')
    setDescription('')

    const fieldIDs = ['name', 'price', 'formFile', 'desc']
    fieldIDs.forEach(id => document.getElementById(id).value = '')
  }

  const test = async () => {
    const res = await nftContract.methods.getMyNFTs('1', address).call()
    console.log(res)
  }

  useEffect(() => {
    if(notification) {
      setTimeout(() => {
        setNotification('')
      }, 2000)
    }
  }, [notification])

  return (

    <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="nft-form" tabIndex="-1" aria-labelledby="nft-formTitle" aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800">Create NFT</h5>
            <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body relative p-4">
            <div class="form-group mb-6">
              <label htmlFor="name" className="form-label inline-block mb-2 text-gray-700">Name</label>
              <input onChange={e => setName(e.target.value)} type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="name" aria-describedby="emailHelp" placeholder="Name"/>
            </div>
            <div class="form-group mb-6">
              <label htmlFor="price" className="form-label inline-block mb-2 text-gray-700">Price</label>
              <input onChange={e => setPrice(e.target.value)} type="number" min={0} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="price" placeholder="Price"/>
            </div>
            <div class="form-group mb-6">
              <label htmlFor="desc" className="form-label inline-block mb-2 text-gray-700">Description</label>
              <textarea onChange={e => setDescription(e.target.value)} className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="desc" rows="3" placeholder="Description"></textarea>
            </div>
            <div class="form-group mb-6">
              <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-700">Upload file</label>
              <input onChange={e => setImage(e.target.files[0])} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile"/>
            </div>
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button onClick={test} type="button" className="inline-block px-6 py-2.5 bg-gray-300 text-white font-medium text-xs leading-tight uppercase rounded focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">Cancel</button>
            <button onClick={createNFT} type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
              Create NFT
            </button>
          </div>
        </div>
      </div>
    </div>



  )
}

export default NFTForm