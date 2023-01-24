import React, { useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { paginado, primeraLectura } from '../../utils/metodosFirebase';

const TesterPaginado = () => {

    const [tester, setTester] = useState({})

    const pagi = async () => {
        // const uno = await paginado()
        // setTester(uno)

        const uno = await primeraLectura();
        setTester(uno)
    }

    return (
        <Container className='my-3'>
            <Button onClick={pagi}>tester</Button>
            {console.log(tester)}
            {/* {console.log(tester.size)} */}
            <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6}  className="g-4">
                {
                    Array.from({ length: 20 }).map((_, idx) => (
                        <Col key={idx}>
                            <Card>
                                <Card.Img variant="top" src="https://cdn0.unprofesor.com/es/posts/7/7/5/que_es_la_forma_musical_y_sus_clasificaciones_3577_orig.jpg" />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit
                                        longer.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    );
};

export default TesterPaginado;