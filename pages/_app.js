import '../styles/globals.css';
import Layout from '../components/layout';

export default function MyApp({ Component, pageProps }) {
  const web3 = "try pass";

  return (
    <Layout>
      <Component {...pageProps} web3={web3} />
    </Layout>
  )
}