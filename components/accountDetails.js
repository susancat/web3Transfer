import {Button, Col, Container, Modal, Row} from 'react-bootstrap';
import { useState } from 'react';
import axios from "axios";

export default function AccountDetails(props) {
    const [balanceRecord, setBalanceRecord] = useState([]);
    const { account } = props;

  const fetchBalance = async() => {
    const res = await axios.get('/api/balances/', { 
      params:
      { 
        account
      }
    })
    setBalanceRecord(res.data.balances)
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" onEntered={fetchBalance}>
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
                              <h5 className='text-dark'>Block&nbsp;{balance}&nbsp;<i className="fa-brands fa-ethereum"></i></h5>
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