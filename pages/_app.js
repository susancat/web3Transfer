import '../styles/globals.css';
import Layout from '../components/layout';
import Web3 from "web3";
import { useState, useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    detectWeb3();
  },[]);
  //---------check if there's web3 connection--------
  const detectWeb3 = async () => {
    let provider;
    if(window.ethereum) {
      provider = window.ethereum;
    } else if(window.web3) {
      provider = window.web3.currentProvider;
    } else { 
      console.log("Please use Metamask to login")
    };
    try {
      await provider.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(provider);
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      await getBalance(web3);
    } catch (err) {
      console.log(
        'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.'
      );
    }
  }

  const getBalance = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    const balInWei = await web3.eth.getBalance(accounts[0]);
    const balance = await web3.utils.fromWei(balInWei);
    setBalance(parseFloat(balance).toFixed(5));
  }

  return (
    <Layout account={account} balance={balance}>
        <Component {...pageProps} account={account} balance={balance} web3={web3} />
    </Layout>
  )
}