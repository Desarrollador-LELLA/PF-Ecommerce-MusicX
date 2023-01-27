import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner, Pagination } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { paginacion } from '../../utils/libreria';
import { todosDocumentos, mostrarImgen, obtienePaginado, siguientePaginado, anteriorPaginado, cambiaPaginado } from '../../utils/metodosFirebase';

const INITIAL_PAGINADO = {
    coleccion: 'productos',
    ordenarPor: 'nombre',
    whereFiltros: null,
    lista: [],
    itemPorPagina: 4,
    paginaActual: 1,
};

const TesterPaginado = () => {

    const algoParaLosfiltros = useLocation();
    const [estadoInicial, setEstadoInicial] = useState(INITIAL_PAGINADO);
    const [loading, setLoading] = useState(false);
    const { cantPaginas, fin, inicio, paginasBar } = paginacion(estadoInicial.lista.length, estadoInicial.paginaActual, estadoInicial.itemPorPagina);

    useEffect(() => {
        llenarLista();
    }, []);

    const llenarLista = async () => {
        setLoading(true);
        const list = await todosDocumentos(estadoInicial.coleccion, estadoInicial.ordenarPor, estadoInicial.whereFiltros, () => {
            setLoading(false);
        });
        setEstadoInicial({ ...estadoInicial, lista: list.result });
    };

    const cambiarPagina = (e) => {
        const nom = e.target.innerText;
        setEstadoInicial({ ...estadoInicial, paginaActual: parseInt(nom) });
    };

    const anterior = () => {
        if (estadoInicial.paginaActual - 1 < 1) return;
        setEstadoInicial({ ...estadoInicial, paginaActual: estadoInicial.paginaActual - 1 });
    };

    const siguiente = () => {
        if (estadoInicial.paginaActual + 1 > cantPaginas) return;
        setEstadoInicial({ ...estadoInicial, paginaActual: estadoInicial.paginaActual + 1 });
    };


    return (
        <Container className='my-3' fluid>
            <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="g-4">
                {
                    loading ? <Spinner animation="border" variant="light" /> :
                        estadoInicial.lista.length ?
                            estadoInicial.lista.slice(inicio, fin).map((x) => (
                                <Col key={x.id}>
                                    <Card>
                                        <Card.Img variant="top" src={x.imagen} />
                                        <Card.Body>
                                            <Card.Title>{x.nombre}</Card.Title>
                                            <Card.Text>
                                                This is a longer card with supporting text below as a natural
                                                lead-in to additional content. This content is a little bit
                                                longer.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )) : null
                }
            </Row>
            <Pagination>
                <Pagination.Prev onClick={anterior} />
                <Pagination.Item onClick={cambiarPagina} active={paginasBar[0] === estadoInicial.paginaActual ? true : false}>{paginasBar[0]}</Pagination.Item>
                {paginasBar[1] && <Pagination.Ellipsis />}

                {paginasBar[2] && <Pagination.Item onClick={cambiarPagina} active={paginasBar[2] === estadoInicial.paginaActual ? true : false}>{paginasBar[2]}</Pagination.Item>}
                {paginasBar[3] && <Pagination.Item onClick={cambiarPagina} active={paginasBar[3] === estadoInicial.paginaActual ? true : false}>{paginasBar[3]}</Pagination.Item>}
                {paginasBar[4] && <Pagination.Item onClick={cambiarPagina} active={paginasBar[4] === estadoInicial.paginaActual ? true : false}>{paginasBar[4]}</Pagination.Item>}

                {paginasBar[5] && <Pagination.Ellipsis />}
                {paginasBar[6] && <Pagination.Item onClick={cambiarPagina} active={paginasBar[6] === estadoInicial.paginaActual ? true : false}>{paginasBar[6]}</Pagination.Item>}
                {<Pagination.Next onClick={siguiente} />}
            </Pagination>
        </Container>
    );
};

export default TesterPaginado;