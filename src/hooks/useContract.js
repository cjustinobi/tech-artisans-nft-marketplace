
import { useState, useEffect, useCallback } from 'react'
import { useCelo } from '@celo/react-celo'


export const useContract = (abi, contractAddress) => {
  // debugger
  // const { getConnectedKit, address } = useContractKit()
  const { kit, address } = useCelo()
  const [contract, setContract] = useState(null)

  const getContract = useCallback(async () => {
    // const kit = await getConnectedKit()

    // get a contract interface to interact with
    setContract(new kit.connection.web3.eth.Contract(abi, contractAddress))
  }, [kit, abi, contractAddress])

  useEffect(() => {
    if (address) getContract()
  }, [address, getContract])

  return contract
}

