import { ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import Layout from '../components/Layout'
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  
  return (
    <ChakraProvider>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp