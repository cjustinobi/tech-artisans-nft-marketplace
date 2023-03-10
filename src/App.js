import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { NotificationContext, LoaderContext } from './contexts/AppContext'
import AppHeader from './components/layout/Header'
import Connect from './components/layout/Connect'
import Notification from './components/layout/Notification'
import Loader from './components/layout/Loader'
import NFTForm from './components/NFTForm'
import Home from './pages/Home'
import MyNFTs from './pages/MyNFTs'
import { CeloProvider, Alfajores, NetworkNames } from '@celo/react-celo'
import '@celo/react-celo/lib/styles.css'


const WrappedApp = () => {
  return (
    <CeloProvider
      networks={[Alfajores]}
      network={{
        name: NetworkNames.Alfajores,
        rpcUrl: 'https://alfajores-forno.celo-testnet.org',
        graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
        explorer: 'https://alfajores-blockscout.celo-testnet.org',
        chainId: 44787,
      }}
      dapp={{
        name: 'NFT Marketplace for Tech Artisans',
        description: '',
        url: 'https://tech-artisans.vercel.app/',
      }}
    >
      <App />
    </CeloProvider>
  )
}

const App = () => {

  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState('')

  return (
    <LoaderContext.Provider value={{loading, setLoading}}>
      <NotificationContext.Provider value={{notification, setNotification}}>
        <AppHeader/>
        <NFTForm />
        <Loader />
        <Connect />
        <Notification />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/my-nfts" element={<MyNFTs/>}/>
        </Routes>

      </NotificationContext.Provider>
    </LoaderContext.Provider>
  )
}

export default WrappedApp
