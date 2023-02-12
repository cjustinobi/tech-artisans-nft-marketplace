// import { ethers } from 'ethers'

export const truncate = input => `${input.substring(0, 5)}...${input.slice(-4)}`

export const priceToWei = (kit, price) => kit.connection.web3.utils.toWei(String(price), 'ether')

export const formatPrice = (kit, price) => kit.connection.web3.utils.fromWei(String(price))

export const cleanDate = dirtyDate => {
  const date = new Date(dirtyDate)
  return date.toUTCString()
}