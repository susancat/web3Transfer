import { useState, useEffect } from "react";
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import Popup from "./popup";

function Transfer(props) {  
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState(0);
    const [variant, setVariant] = useState("");
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const { web3, account, balance } = props;
    useEffect(() => {
        console.log(show)
    });
    const transactionsubmitted = async (hash) => {
        console.log(hash);
        setVariant("secondary");
        setMessage("Transaction submitted with hash ID: " + hash);
        setShow(true);
    }
    const transfer = async () => {
        const amountInWei = await web3.utils.toWei(amount.toString(), 'ether');
        try {
            await web3.eth.sendTransaction({
            from: account,
            to: recipient,//0xc28b02f9316E3D9c0BF7cfE14dbaBC6D67230E78
            value: amountInWei,
            chainId: 4
            })
            .once('transactionHash', function(hash){
                transactionsubmitted(hash);
            })
            // .on('receipt', async function(receipt){
            //   if(receipt.status === false) {
            //     await setVariant("danger");
            //     await setMessage(receipt.status);
            //     await setShow(true);
            //   }
            // })
            // .on('confirmation', async function(confirmationNumber, receipt){ 
            //  }).then(() => {
            //     setVariant("secondary");
            //     setMessage("Transaction sent");
            //     setShow(true);
            //     console.log("Transaction sent");
            // })
            
            // .on('error', console.error); // If a out of gas e
        } catch (err) {
            console.log(err)
        }
    }

    return (
    <>
    <Row className="mt-2 justify-content-end" style={{height: "5rem"}}>
        <Popup variant={variant} changeShow={(show) => setShow(show)} message={message} />
    </Row>
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
                            className="mb-2" 
                            style={{width:"100%", borderRadius:'15px'}} 
                            onClick={() => transfer()}
                        >Send</Button>
                    :
                         <Button 
                            variant="primary" 
                            size="lg" 
                            className="mb-2" 
                            style={{width:"100%", borderRadius:'15px'}} 
                            disabled
                        >Insufficient balance</Button>
                    }
                </Form>
            </Card>
        </Col>
    </Row>
    </>
  );
}

export default Transfer;