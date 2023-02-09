import { useContext } from 'react'
import { LoaderContext } from '../../contexts/AppContext'


const Loader = () => {

  const { loading } = useContext(LoaderContext)
  return (
    <div className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'}>
      {loading && <div class="flex justify-center items-center z-50">
        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>}
    </div>
  )
}

export default Loader