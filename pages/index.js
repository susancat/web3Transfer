import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Transfer from '../components/transactionUpdater/Transfer'
export default function Home(props) {
  const { account, balance, web3 } = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>transfer tokens</title>
        <meta name="description" content="web3 token check and transfer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Transfer account={account} balance={balance} web3={web3} />
    </div>
  )
}
