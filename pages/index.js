import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Nav from '../components/Nav'
import Transfer from '../components/transactionUpdater/Transfer'
import { useState, useEffect } from 'react'
import Web3 from 'web3';
import Web3Modal from 'web3modal';

export default function Home() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    (async () => {
       if(localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")) 
       {
         await connectPrompt();
        }
    })()
  }, [])

  //---------check if there's web3 connection--------
  async function getWeb3Modal() {
    const providerOptions = {
      //for wallet other than metamask only but required
    };
    const web3Modal = new Web3Modal({
        network: 'rinkeby',
        cacheProvider: true, // optional
        providerOptions, // required
        disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });
    return web3Modal;
  }

  async function connectPrompt() {
    try{
      const web3Modal = await getWeb3Modal();
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      fetchAccountData(web3);
      window.ethereum.on("accountsChanged", (accounts) => {
        fetchAccountData(web3);
     });
    } catch(err){
      console.log(err)
    }
  }

  async function fetchAccountData(web3) {
    try {
    // const chainId = await web3.eth.getChainId();    
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const balInWei = await web3.eth.getBalance(accounts[0]);
    const balance = await web3.utils.fromWei(balInWei);
    setBalance(parseFloat(balance).toFixed(5));
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>transfer tokens</title>
        <meta name="description" content="web3 token check and transfer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav account={account} balance={balance} web3={web3} />
      <Transfer account={account} balance={balance} web3={web3} />
    </div>
  )
}
