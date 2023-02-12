import { useCelo } from '@celo/react-celo'

const Connect = () => {

  const { address, connect } = useCelo()

  return (
    <>{!address && <div className="flex justify-center mt-20">
      <button onClick={() => connect()} className="w-50 block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        Connect Wallet
      </button>
    </div>}</>
  )
}

export default Connect