import { Link } from 'react-router-dom'
import { useCelo } from '@celo/react-celo'
import { PlusSmIcon } from '@heroicons/react/solid'
import { truncate } from '../../utils'

import logo from '../../assets/img/logo.png'


const AppHeader = () => {

  const { address, connect, disconnect } = useCelo()

  return (
    <div>
    <nav className=" relative w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <button className="navbar-toggler text-gray-500 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" className="w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
          </svg>
        </button>
        <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
          <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
            <li className="nav-item p-2">
              <Link to={'/'}>
                <img className="w-20" src={logo} alt=""/>
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link to={'/'} className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="#">NFTs</Link>
            </li>
            <li className="nav-item p-2">
              <Link to={'/my-nfts'} className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="#">My NFTs</Link>
            </li>

          </ul>
        </div>
        <div className="flex items-center relative">
          <div className="dropdown relative">
            <span data-bs-toggle="modal" data-bs-target="#nft-form" className="text-gray-500 hover:text-gray-700 focus:text-gray-700 mr-4 dropdown-toggle hidden-arrow flex items-center" id="dropdownMenuButton1" role="button" aria-expanded="false">
              <PlusSmIcon className="w-8 h-8 text-gray-500" />
            </span>
          </div>

          <div className="flex justify-center">
            {address ? <div>
              <div className="dropdown relative">
                <button className=" dropdown-toggle px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  {truncate(address)}
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" className="w-2 ml-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
                  </svg>
                </button>
                <ul className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <span onClick={() => disconnect()} className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">Disconnect</span>
                  </li>
                </ul>
              </div>
            </div> :
              <button onClick={() => connect()} className=" dropdown-toggle px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap" type="button" aria-expanded="false">
                Connect
              </button>}
          </div>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default AppHeader