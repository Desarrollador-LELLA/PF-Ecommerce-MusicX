import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { paginacion } from '../../utils/libreria';
import { todosDocumentos, mostrarImgen, obtienePaginado, siguientePaginado, anteriorPaginado } from '../../utils/metodosFirebase';

const INITIAL_PAGINADO = {
    coleccion: 'productos',
    ordenarPor: 'nombre',
    ultimaVisible: null,
    primeraVisible: null,
    lista: [],
    numPaginas: 1,
    paginaActual: 1,
    cantidadItems: 0
};

const TesterPaginado = () => {

    const algo = useLocation();
    const [tester, setTester] = useState(INITIAL_PAGINADO);
    const { cantPaginas, fin, inicio, paginasBar } = paginacion(tester.cantidadItems, tester.paginaActual);

    useEffect(() => {
        pagi();
    }, []);

    // const imagen = () => {
    //     mostrarImgen();
    // };

    const pagi = async () => {
        const paginadoInicial = await obtienePaginado(tester.coleccion, tester.ordenarPor);
        const { lista, numPaginas, primeraVisible, ultimaVisible } = paginadoInicial;
        setTester({ ...tester, lista, numPaginas: numPaginas.paginas, cantidadItems: numPaginas.totalItems, primeraVisible, ultimaVisible });
    };

    const siguiente = async () => {
        const sigPag = await siguientePaginado(tester.coleccion, tester.ordenarPor, tester.ultimaVisible);
        const { lista, primeraVisible, ultimaVisible } = sigPag;
        setTester({ ...tester, lista, primeraVisible, ultimaVisible, paginaActual: tester.paginaActual + 1 });
    };

    const anterior = async () => {
        const antPag = await anteriorPaginado(tester.coleccion, tester.ordenarPor, tester.primeraVisible);
        const { lista, primeraVisible, ultimaVisible } = antPag;
        setTester({ ...tester, lista, primeraVisible, ultimaVisible, paginaActual: tester.paginaActual - 1 });
    };

    return (
        <Container className='my-3' fluid>
            {/* <Button onClick={pagi}>tester</Button> */}
            {/* <Button onClick={imagen}>testerimagen</Button> */}
            {console.log(tester)}
            {console.log(paginasBar)}
            {/* {console.log(tester.size)} */}
            <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6} className="g-4">
                {
                    tester.lista.map((x) => (
                        <Col key={x.id}>
                            <Card>
                                <Card.Img variant="top" src="https://cdn0.unprofesor.com/es/posts/7/7/5/que_es_la_forma_musical_y_sus_clasificaciones_3577_orig.jpg" />
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
                    ))
                }
            </Row>
            <Pagination>
                <Pagination.Prev onClick={anterior} />
                <Pagination.Item active={paginasBar[0] === tester.paginaActual ? true : false}>{paginasBar[0]}</Pagination.Item>
                {paginasBar[1] && <Pagination.Ellipsis />}

                {paginasBar[2] && <Pagination.Item active={paginasBar[2] === tester.paginaActual ? true : false}>{paginasBar[2]}</Pagination.Item>}
                {paginasBar[3] && <Pagination.Item active={paginasBar[3] === tester.paginaActual ? true : false}>{12}</Pagination.Item>}
                {paginasBar[4] && <Pagination.Item active={paginasBar[4] === tester.paginaActual ? true : false}>{13}</Pagination.Item>}

                {paginasBar[5] && <Pagination.Ellipsis />}
                {paginasBar[6] && <Pagination.Item active={paginasBar[6] === tester.paginaActual ? true : false}>{20}</Pagination.Item>}
                {<Pagination.Next onClick={siguiente} />}
            </Pagination>
            {/* <Boton icono={iconoAnterior} alt='Anterior' onClick={anterior} />
                    <Boton texto={paginasBar[0]} onClick={cambiarPagina} focus={paginasBar[0] === pagSelec ? true : false} />
                    {paginasBar[1] && <div>...</div>}
                    {paginasBar[2] && <Boton texto={paginasBar[2]} onClick={cambiarPagina} focus={paginasBar[2] === pagSelec ? true : false} />}
                    {paginasBar[3] && <Boton texto={paginasBar[3]} onClick={cambiarPagina} focus={paginasBar[3] === pagSelec ? true : false} />}
                    {paginasBar[4] && <Boton texto={paginasBar[4]} onClick={cambiarPagina} focus={paginasBar[4] === pagSelec ? true : false} />}
                    {paginasBar[5] && <div>...</div>}
                    {paginasBar[6] && <Boton texto={paginasBar[6]} onClick={cambiarPagina} focus={paginasBar[6] === pagSelec ? true : false} />}
                    <Boton icono={iconoSiguiente} alt='Siguiente' onClick={siguiente} /> */}
        </Container>
    );
};

export default TesterPaginado;