import { useState } from "react";
import { Row, Col, Button, Form, Card } from 'react-bootstrap';

function Transfer(props) {  
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState(0);
//two methods for transfering, one is writing a simple ABI and connect contract
//another is writing a transaction object for transfering
    const transfer = async () => {
        const { web3 } = props;
        const accounts = await web3.eth.getAccounts();
        const amountInWei = await web3.utils.toWei(amount, 'ether');
        await web3.eth.sendTransaction({
            from: accounts[0],
            to: recipient,
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
                            type="number" 
                            placeholder="Amount" 
                            style={{height: '3rem'}} 
                            onChange={event => setAmount(Number(event.target.value))}
                            required
                        />
                        <Form.Text className="text-muted">
                        <h6 className='mt-2 d-flex justify-content-end'>MAX: {props.balance}&nbsp;<i className="fa-brands fa-ethereum"></i></h6>
                    </Form.Text>
                    </Form.Group>
                    {
                        amount <= props.balance ?
                        <Button 
                            variant="primary" 
                            size="lg" 
                            type="Send" 
                            className="mb-2" 
                            style={{width:"100%", borderRadius:'15px'}} 
                            onClick={transfer}
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