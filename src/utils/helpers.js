// import { ethers } from 'ethers'

export const truncate = input => `${input.substring(0, 5)}...${input.slice(-4)}`

export const formatPrice = price => ethers.utils.parseUnits(String(price), 'ether')

export const cleanDate = dirtyDate => {
  const date = new Date(dirtyDate)
  return date.toUTCString()
}