import dynamic from "next/dynamic"
import { Provider, chain, defaultChains } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import "../styles/globals.css"

// Chains for connectors to support
const chains = defaultChains
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID

// Set up connectors
const connectors = () => {
  const rpcUrl = chain.mainnet.rpcUrls[0]
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new CoinbaseWalletConnector({
      options: {
        appName: "Floan",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ]
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider autoConnect connectors={connectors}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

// export default MyApp
export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
})
