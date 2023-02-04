import React from 'react';
import { Card, Col, Placeholder, Row } from 'react-bootstrap';
import s from '../../css/keys.module.css';
import iconoGenero from '../images/ic_loading.svg';

const CardLoading = () => {
    return (
        <>
            {Array.from({ length: 6 }).map((_, idx) => (
                <Col key={idx}>
                    <Card className={`${s.card_keys} h-100 border-0`}>
                        <Card.Body>
                            <Card.Img src={iconoGenero} className={`${s.placeholder_img} rounded-circle p-3`} />
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} bg="success" />
                            </Placeholder>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={4} bg="success" />
                            </Placeholder>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={12} bg="success" />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </>
    );
};

export default CardLoading;