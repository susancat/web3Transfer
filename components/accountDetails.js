import {Button, Col, Container, Modal, Row} from 'react-bootstrap';
import { useState, useEffect } from 'react';
// import Web3Modal from "web3modal";

function AccountDetails(props) {
    const [balanceRecord, setBalanceRecord] = useState([]);
    const { web3, account } = props;

    useEffect(() => {
        balanceHistory(web3);
    },[account]);
      
    const balanceHistory = async (web3) => {
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
            // console.log(balanceRecord)
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
                <h4 className='text-dark mb-2'>Your account balance history </h4>
                { balanceRecord.map((balance, index) => {
                  return(
                      <Row key={index}>
                          <Col xs={12}>
                              <h5 className='text-dark'>Block:&nbsp;{balance}&nbsp;<i className="fa-brands fa-ethereum"></i></h5>
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