import React from 'react';
import { Card, Col, Container, Pagination, Row, Image, Badge } from 'react-bootstrap';
import s from '../../css/keys.module.css';
import iconoGenero from '../images/ic_keys.svg';

const INITIAL_PAGINADO = {
    coleccion: 'Key',
    ordenarPor: 'id',
    whereFiltros: null,
    lista: [],
    itemPorPagina: 6,
    paginaActual: 1,
};

const Keys = () => {
    return (
        <Container fluid>
            <h1 className={`${s.text_color_keys} text-center p-3 fw-bold`}>Administracion de Keys</h1>
            {console.log(iconoGenero)}
            <Row xs={2} sm={3} md={3} lg={4} xl={5} xxl={6} className="g-4">
                <Col>
                    <Card className={`${s.card_keys} h-100 border-0`}>
                        <Card.Body>
                            <Card.Img src={iconoGenero} className={`${s.img_keys} rounded-circle p-3`} />
                            <div className={`${s.img_keys} rounded-circle`}>
                            </div>
                            <Card.Title>{'x.nombre'}</Card.Title>
                            <Card.Text>Luis</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


            {/* <Row xs={2} sm={3} md={3} lg={4} xl={5} xxl={6} className="g-4">
                {
                    loading ? <Spinner animation="border" variant="light" /> :
                        estadoInicial.lista.length ?
                            estadoInicial.lista.slice(inicio, fin).map((x) => (
                                <Col key={x.id}>
                                    <Card className={`${styles.card_biblioteca} h-100`}>
                                        <Card.Img variant="top" className={`${styles.img_biblioteca} rounded-circle p-4`} src={x.imagen} />
                                        <Card.Body>
                                            <Card.Title className={`${styles.cardtitulo_biblioteca}`}>{x.nombre}</Card.Title>
                                            <Card.Text className={`${styles.cardtext_biblioteca}`}>
                                                This is a longer card with supporting text below as a natural
                                                lead-in to additional content. This content is a little bit
                                                longer.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )) : <h1 >No hay beat</h1>
                }
            </Row> */}
            {/* <Pagination className='justify-content-center' >
                <Pagination.Prev onClick={anterior} />
                <Pagination.Item onClick={cambiarPagina} active={paginasBar[0] === estadoInicial.paginaActual ? true : false}>{paginasBar[0]}</Pagination.Item>
                {paginasBar[1] && <Pagination.Ellipsis />}

                {paginasBar[2] && <Pagination.Item onClick={cambiarPagina} active={paginasBar[2] === estadoInicial.paginaActual ? true : false}>{paginasBar[2]}</Pagination.Item>}
                {paginasBar[3] && <Pagination.Item onClick={cambiarPagina} active={paginasBar[3] === estadoInicial.paginaActual ? true : false}>{paginasBar[3]}</Pagination.Item>}
                {paginasBar[4] && <Pagination.Item onClick={cambiarPagina} active={paginasBar[4] === estadoInicial.paginaActual ? true : false}>{paginasBar[4]}</Pagination.Item>}

                {paginasBar[5] && <Pagination.Ellipsis />}
                {paginasBar[6] && <Pagination.Item onClick={cambiarPagina} active={paginasBar[6] === estadoInicial.paginaActual ? true : false}>{paginasBar[6]}</Pagination.Item>}
                {<Pagination.Next onClick={siguiente} />}
            </Pagination> */}
        </Container>
    );
};

export default Keys;