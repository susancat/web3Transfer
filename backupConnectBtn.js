import { useState, useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";

import { Button, ButtonGroup } from "react-bootstrap";
//need to check the network and enable switch
const ConnectBtn = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    detectWeb3();
  })
//check if there's web3 connection
  const detectWeb3 = async () => {
    let provider;
    if(window.ethereum) {
      provider = window.ethereum;
    } else if(window.web3) {
      provider = window.web3.currentProvider;
    }
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    await getBalance(web3);
  }
  const getWeb3Modal = async() => {
    const providerOptions = {
      /* options are for wallet other than metamask setting */
    };
    const web3Modal = new Web3Modal({
        network: "rinkeby", // optional
        cacheProvider: true, // optional
        providerOptions, // required
        disableInjectedProvider: false
      });
      return web3Modal;
  }

  const getBalance = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    const balInWei = await web3.eth.getBalance(accounts[0]);
    const balance = await web3.utils.fromWei(balInWei);
    setBalance(parseFloat(balance).toFixed(5));
  }
  const connect = async () => {
    const web3Modal = await getWeb3Modal();
    const provider = await web3Modal
    .connect()
    .catch(error => {
      console.log(error);
    }
    );
    const web3 = new Web3(provider);
    await getBalance(web3);
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }
  return(
    <div>
      {account ?
      <ButtonGroup size="lg" className="mb-2">
        <Button variant="light" disabled>{balance}&nbsp;<i className="fa-brands fa-ethereum"></i></Button>
        <Button variant="secondary">{account.slice(0,5).concat('...').concat(account.slice(-4))}</Button>
      </ButtonGroup>
      :
      <Button variant="light" size="lg" onClick={connect}>Connect</Button>
      }
    </div>
  )
}

export default ConnectBtn;