import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Poppins} from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({weight: ["400", "500", "700"], subsets:['latin']})

export default function App({ Component, pageProps }: AppProps) {
  return (

     <main className={`${poppins.className} p-3`}>
      <ToastContainer />
      <Component {...pageProps} />
    </main>
  
  )
}
