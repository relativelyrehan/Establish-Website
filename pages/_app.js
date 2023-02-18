import '../styles/globals.css'
import ContextProvider from '../utils/context/context'

function MyApp({ Component, pageProps }) {
  return <ContextProvider>
    <Component {...pageProps} />
  </ContextProvider>
}

export default MyApp
