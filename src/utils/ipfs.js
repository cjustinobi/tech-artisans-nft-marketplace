import axios  from 'axios'
import { IPFSUrl } from './constants'

export const imageToIPFS = async (image) => {

  let data = new FormData()

  data.append('file', image, image.name)
  data.append('pinataOptions', '{"cidVersion": 1}')

  let config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    headers: {
      'Content-Type': `multipart/form-data boundary=${data._boundary}`,
      'Authorization': `Bearer ${process.env.REACT_APP_PINATA_JWT}`
    },
    data
  }

  const res = await axios(config)

  return res.data.IpfsHash
}

export const JSONToIPFS = async(json) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`

  // Making axios POST request to Pinata.
  const res = axios.post(url, json, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_PINATA_JWT}`
      }
    })

  return res.data.IpfsHash

}

