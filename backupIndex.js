import { useState, useEffect } from 'react';
import Web3 from 'web3';

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Transfer from '../components/transactionUpdater/Transfer'
export default function Home() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [web3, setWeb3] = useState(null);
  useEffect(() => {
    detectWeb3();
    onConnect();
  }, [])

  const detectWeb3 = async () => {
    let provider;
    if(window.ethereum) {
      provider = window.ethereum;
    } else if(window.web3) {
      provider = window.web3.currentProvider;
    } else { 
      console.log("Please use Metamask to login")
    };
    return provider;
  }

  const onConnect = async () => {
    try {
      const provider = await detectWeb3();
      if(provider) {
        if (provider !== window.ethereum) {
          console.log(
            'Non wallet detected. You should consider installing MetaMask!'
          );
        }
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        const balInWei = await web3.eth.getBalance(accounts[0]);
        const balance = web3.utils.fromWei(balInWei);
        setWeb3(web3);
        setAccount(accounts[0]);
        setBalance(parseFloat(balance).toFixed(5));
      }} catch (err) {
      console.log(
        'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
      );
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>transfer tokens</title>
        <meta name="description" content="web3 token check and transfer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Transfer balance={balance} web3={web3} />
    </div>
  )
}
