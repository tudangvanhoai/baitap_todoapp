import LoadingProvider from './providers/LoadingProvider'
import Routes from './routes'
import './styles/index.css'
import './styles/theme.css'

function App() {
  return (
    <LoadingProvider>
      <Routes />
    </LoadingProvider>
  )
}

export default App
