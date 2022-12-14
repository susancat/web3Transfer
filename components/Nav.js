import { Button, ButtonGroup, Container, Navbar } from 'react-bootstrap';
import AccountDetails from './accountDetails';
import Transfer from './transactionUpdater/Transfer';
import { useState, useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import axios from "axios";

const Nav = (props) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setAccount(props.account);
    setBalance(props.balance);
    setWeb3(props.web3);
    postBalances(props.web3);
  },[props]);

  //------if no web3 connection, connect--------
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

  async function fetchAccountData(web3) { 
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const balInWei = await web3.eth.getBalance(accounts[0]);
    const balance = await web3.utils.fromWei(balInWei);
    setBalance(parseFloat(balance).toFixed(5));
  }

  const connect = async () => {
    if(!window.ethereum) throw new Error("No crypto wallet found!");
      try{
        const web3Modal = await getWeb3Modal();
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        const chainId = await web3.eth.getChainId();
        if (chainId !== 4) {
          switchNetwork();
        }
        setWeb3(web3);
        fetchAccountData(web3);
        postBalances(web3);
        window.ethereum.on("accountsChanged", (accounts) => {
          fetchAccountData(web3);
          postBalances(web3);
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
            fetchAccountData(web3);
            postBalances(web3);
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

  async function getBalanceHistory(web3) {
    try {
      const blockNumber = await web3.eth.getBlockNumber();
      let balanceRecord = new Array(0);
      let recordNum;
      if(blockNumber > 10000) {
          recordNum = 11;
      } else {
          recordNum = Math.floor(blockNumber / 1000);
      }
       for (let i = 0; i < recordNum; i++){
          let displayBlock = blockNumber - i * 1000;
          await web3.eth.getBalance(account, displayBlock, async(err, balance) => {
              balance = parseFloat(web3.utils.fromWei(balance)).toFixed(5);
              let value = `${displayBlock} : ${balance}`
              balanceRecord.push(value);
              // postBalances(balanceRecord);
          })
        }   
       return balanceRecord;
    } catch (err) {
      console.log(err);
    }
  }

async function postBalances(web3) {
    const balanceRecord= await getBalanceHistory(web3);
    const request = await axios.post('/api/balances/', { 
      account,
      balances: balanceRecord
    }).then(() => {
      console.log(request)
    })
}

  return (
    <>
    <Navbar>
      <Container>
      <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <div>
              {account ?
              <ButtonGroup size="lg" className="mb-2">
                <Button variant="light" disabled>{balance}&nbsp;<i className="fa-brands fa-ethereum"></i></Button>
                <Button 
                  variant="secondary"
                  onClick={() => {setModalShow(true)}}
                  >
                    {account.slice(0,5).concat('...').concat(account.slice(-4))}
                  </Button>
              </ButtonGroup>
              :
              <Button variant="light" size="lg" onClick={connect}>Connect</Button>
              }
            </div>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Transfer 
      account={account} 
      balance={balance} 
      web3={web3} 
      getBalance={(balance) => setBalance(balance)} />
    <AccountDetails 
      account={account}
      show={modalShow} 
      onHide={() => setModalShow(false)} 
    />
    </>
  );
}

export default Nav;