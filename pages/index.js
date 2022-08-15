import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Nav from '../components/Nav'
// import Transfer from '../components/transactionUpdater/Transfer'
import { useState, useEffect } from 'react'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import axios from "axios"

export default function Home() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [balanceRecord, setBalanceRecord] = useState([]);

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
      const chainId = await web3.eth.getChainId();   
      if (chainId !== 4) {
        switchNetwork();
      }
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      
      postBalanceHistory(web3);
      fetchAccountData(web3);
      const request = await axios.post('/api/balances/', { 
        account: accounts[0],
        balanceRecord
       })
       console.log(request);

       window.ethereum.on("accountsChanged", (accounts) => {
        fetchAccountData(web3);
       });
    } catch(err){
      console.log(err)
    }
  }

  async function switchNetwork() {
    if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: Web3.utils.toHex(4) }], // chainId must be in hexadecimal numbers
          })
          .then (async() => {
            const web3Modal = await getWeb3Modal();
            const provider = await web3Modal.connect();
            const web3 = new Web3(provider);
            postBalanceHistory(web3);
            const request = await axios.post('/api/balances/', { 
              account,
              balanceRecord
            })
            fetchAccountData(web3);
            }).catch(err => {
              console.log(err);
            }
          );
        } catch (error) {
          if (error.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '4',
                    rpcUrl: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
                  },
                ],
              });
            } catch (addError) {
              console.error(addError);
            }
          }
          console.error(error);
        }
      } else {
        // if no window.ethereum then MetaMask is not installed
        alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
      } 
  }

  async function fetchAccountData(web3) {
    try { 
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const balInWei = await web3.eth.getBalance(accounts[0]);
    const balance = await web3.utils.fromWei(balInWei);
    setBalance(parseFloat(balance).toFixed(5));
    } catch(err) {
      console.log(err)
    }
  }

  async function postBalanceHistory(web3) {
    try {
      const blockNumber = await web3.eth.getBlockNumber();
      // console.log(blockNumber);
      let recordNum;
      if(blockNumber > 10000) {
          recordNum = 11;
      } else {
          recordNum = Math.floor(blockNumber / 1000);
      }

       for (let i = 0; i < recordNum; i++){
          let displayBlock = blockNumber - i * 1000;
          web3.eth.getBalance(account, displayBlock, (err, balance) => {
              balance = parseFloat(web3.utils.fromWei(balance)).toFixed(5);
              console.log("block: " + displayBlock + " balance: " + balance);
              let value = `${displayBlock}: ${balance}`
              // const newRecord = [...balanceRecord, value]
              // setBalanceRecord(newRecord);
              balanceRecord.push(value);
          })
       }
    } catch (err) {
      console.log(err);
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
      {/* <Transfer account={account} balance={balance} web3={web3} /> */}
    </div>
  )
}
