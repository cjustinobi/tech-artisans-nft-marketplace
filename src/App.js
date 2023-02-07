import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { NotificationContext } from './contexts/AppContext'
import AppHeader from './components/layout/Header'
import Notification from './components/layout/Notification'
import NFTForm from './components/NFTForm'
import Home from './pages/Home'
// import Events from './pages/Events'
import { CeloProvider, Alfajores, NetworkNames } from '@celo/react-celo'
import '@celo/react-celo/lib/styles.css'
// import './app.css'


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
        url: 'https://bwceventhub.netlify.app',
      }}
    >
      <App />
    </CeloProvider>
  )
}

const App = () => {

  const navigate = useNavigate()

  // const [drawer, setDrawer] = useState(false)
  const [notification, setNotification] = useState('')

  const showEventForm = () => {
    navigate('/events', {
      state: { showForm: true }
    })
  }

  return (
    <NotificationContext.Provider value={{notification, setNotification}}>
      <AppHeader/>
      <NFTForm />
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/*<Route path="/events" element={<Events/>}/>*/}
      </Routes>

    </NotificationContext.Provider>
  )
}

export default WrappedApp
