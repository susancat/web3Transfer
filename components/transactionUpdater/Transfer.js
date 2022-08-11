import { useState } from "react";
import { Row, Col, Button, Form, Card } from 'react-bootstrap';

function Transfer(props) {  
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState(0);
    const { web3, account, balance } = props;
//two methods for transfering, one is writing a simple ABI and connect contract
//another is writing a transaction object for transfering
    const transfer = async (recipient, amount) => {
        const amountInWei = await web3.utils.toWei(amount, 'ether');
        await web3.eth.sendTransaction({
            from: account,
            to: recipient,//0xc28b02f9316E3D9c0BF7cfE14dbaBC6D67230E78
            value: amountInWei
        }, (err, res) => {
            err ? console.log(err) : console.log(res);
        });
    }
    return (
    <Row className="mt-5 justify-content-center">
        <Col xs={4}>
            <Card className="bg-light text-white">
                <Form className='p-2'>
                    <Form.Text className="text-muted">
                        <h4 className='mt-3 ms-2'>Transfer</h4>
                    </Form.Text>
                    <Form.Group className="mb-3 mt-3" controlId="">
                        <Form.Control 
                            type="text" 
                            placeholder="Recipient Address" 
                            style={{height: '3rem'}} 
                            onChange={event => setRecipient(event.target.value)} 
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 mt-3" controlId="">
                        <Form.Control 
                            type="text" 
                            placeholder="Amount" 
                            style={{height: '3rem'}} 
                            onChange={event => setAmount(Number(event.target.value))}
                            required
                        />
                        <Form.Text className="text-muted">
                        <h6 className='mt-2 d-flex justify-content-end'>MAX: {balance}&nbsp;<i className="fa-brands fa-ethereum"></i></h6>
                    </Form.Text>
                    </Form.Group>
                    {
                        recipient && amount && amount <= balance ?
                        <Button 
                            variant="primary" 
                            size="lg" 
                            type="Send" 
                            className="mb-2" 
                            style={{width:"100%", borderRadius:'15px'}} 
                            onClick={transfer.bind(this, recipient, amount.toString())}
                        >
                        Send
                        </Button>
                    :
                         <Button variant="primary" size="lg" type="Send" className="mb-2" style={{width:"100%", borderRadius:'15px'}} disabled>Insufficient balance</Button>
                    }
                </Form>
            </Card>
        </Col>
    </Row>
  );
}

export default Transfer;