import {Button, Col, Container, Modal, Row} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Web3 from "web3";

function AccountDetails(props) {
    const [balanceRecord, setBalanceRecord] = useState([]);
    const [account, setAccount] = useState(null);
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
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
          await balanceHistory(web3);
        } catch (err) {
          console.log(err);
        }
      }
    const balanceHistory = async (web3) => {
        const blockNumber = await web3.eth.getBlockNumber();
        console.log(blockNumber);
        let recordNum;
        if(blockNumber > 10000) {
            recordNum = 10;
        } else {
            recordNum = Math.floor(blockNumber / 1000);
        }
         for (let i = 0; i < recordNum; i++){
            let displayBlock = blockNumber - i * 1000;
            await web3.eth.getBalance(account, displayBlock, (err, balance) => {
                console.log("block: " + displayBlock + " balance: " + balance);
                const newRecord = [...balanceRecord, `${displayBlock}: ${balance}`]
                setBalanceRecord(newRecord);
            })
         }
    }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title className='text-dark' id="contained-modal-title-vcenter">
          Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
        <Row>
            {account ?
            <h4 className='text-dark text-center'>{account.slice(0,5).concat('...').concat(account.slice(-4))}</h4> :
            <h4 className='text-dark'>Loading...</h4>
            }
        </Row>
            <Row className='mt-2'>
                <Col xs={6} md={8}>
                    <h5 className='mt-2 text-dark'>Connected with Metamask</h5>
                </Col>
                <Col xs={6} md={4}>
                <Button variant='outline-danger'>Disconnect</Button>
                </Col>
            </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer className='mb-5'>
            <Container className='text-center'>
                <h5 className='text-dark'>Your account balance history </h5>
                { balanceRecord.map((balance, index) => {
                return(
                    <Row key={index}>
                        <Col xs={12}>
                            <h5 className='text-dark'>{balance}</h5>
                        </Col>
                    </Row>
                )
                })
                }
            </Container>
      </Modal.Footer>
    </Modal>
  );
}

export default AccountDetails;