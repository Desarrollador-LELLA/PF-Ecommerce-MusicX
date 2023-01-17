import React from 'react';
import { Card, Container } from 'react-bootstrap';

const Registro = () => {
    return (
        <Container>
            <Card border="dark border border-2">
                <Card.Header>
                    Cabecera
                </Card.Header>
                <Card.Body>
                    cuerpo
                </Card.Body>
                <Card.Footer>
                    pie
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Registro;