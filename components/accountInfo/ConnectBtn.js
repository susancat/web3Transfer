import { useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";

import { Button, ButtonGroup } from "react-bootstrap";
//need to check the network and enable switch
const ConnectBtn = () => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(0);
    const providerOptions = {
        /* options are for wallet other than metamask setting */
      };

  const getWeb3Modal = async() => {
    const web3Modal = new Web3Modal({
        network: "rinkeby", // optional
        cacheProvider: true, // optional
        providerOptions, // required
        disableInjectedProvider: false
      });
      return web3Modal;
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
  const accounts = await web3.eth.getAccounts();
  const balInWei = await web3.eth.getBalance(accounts[0]);
  const balance = await web3.utils.fromWei(balInWei);
  setAccount(accounts[0]);
  setBalance(parseFloat(balance).toFixed(5));
  console.log(balance);
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