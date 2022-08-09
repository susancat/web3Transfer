import { Row, Col, Button, Form, Card } from 'react-bootstrap';

function Transfer() {
  return (
    <Row className="mt-5 justify-content-center">
        <Col xs={4}>
            <Card className="bg-light text-white">
                <Form className='p-2'>
                    <Form.Text className="text-muted">
                        <h4 className='mt-3 ms-2'>Transfer</h4>
                    </Form.Text>
                    <Form.Group className="mb-3 mt-3" controlId="">
                        <Form.Control type="text" placeholder="Recipient Address" style={{height: '3rem'}} />
                    </Form.Group>

                    <Form.Group className="mb-3 mt-3" controlId="">
                        <Form.Control type="number" placeholder="Amount" style={{height: '3rem'}}/>
                        {/* better to display the balance and enable a "max" button */}
                    </Form.Group>
                    <Button variant="primary" size="lg" type="Send" style={{width:"100%", borderRadius:'15px'}} >
                        Send
                    </Button>
                </Form>
            </Card>
        </Col>
    </Row>
    
  );
}

export default Transfer;