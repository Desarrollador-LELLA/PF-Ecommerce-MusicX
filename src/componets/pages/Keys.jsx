import { arrayUnion } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Pagination, Row, Image, Modal, Button, Spinner, Badge, FloatingLabel, Form } from 'react-bootstrap';
import s from '../../css/keys.module.css';
import { paginacion } from '../../utils/libreria';
import { actualizaDocumento, unDocumentoCallback, unDocumento } from '../../utils/metodosFirebase';
import { ValidoKey } from '../../utils/validaciones';
import CardLoading from '../com/CardLoading';
import iconoGenero from '../images/ic_keys.svg';

const INITIAL_STATE = {
    coleccion: 'keys',
    id: 'dogKeys',
    lista: [],
    itemPorPagina: 6,
    paginaActual: 1,
};

const INITIAL_STATE_KEY = {
    id: '',
    nombre: '',
    habilitado: true,
    index: -1
};

const Keys = () => {

    const [estadoInicial, setEstadoInicial] = useState(INITIAL_STATE);
    const [modalCrear, setModalCrear] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [loading, setLoading] = useState(false);
    const { cantPaginas, fin, inicio, paginasBar } = paginacion(estadoInicial.lista.length, estadoInicial.paginaActual, estadoInicial.itemPorPagina);

    const [key, setKey] = useState(INITIAL_STATE_KEY);
    const [errores, setErrores] = useState({});

    useEffect(() => {
        llenarLista();
    }, []);

    const llenarLista = async () => {
        setLoading(true);
        await unDocumentoCallback(estadoInicial.coleccion, estadoInicial.id, (retorno) => {
            setEstadoInicial({ ...estadoInicial, lista: retorno.result.keys });
            setLoading(false);
        });
    };

    const abrirCerrarModalCrear = () => {
        setKey(INITIAL_STATE_KEY);
        setErrores({});
        setModalCrear(!modalCrear);
    };

    const abrirCerrarModalEditar = () => {
        setKey(INITIAL_STATE_KEY);
        setErrores({});
        setModalEditar(!modalEditar);
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

    const onChangeKey = (e) => {
        setKey({
            ...key,
            [e.target.name]: e.target.value
        });

        setErrores(ValidoKey({
            ...key,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmitCrear = (e) => {
        e.preventDefault();
        // if (errorAuth) {
        //     dispatch(errorAction(''));
        // }

        if (errores.valido) {
            //setLoading(true);
            crearKeyMetodo();
        }
    };

    const onSubmitEditar = (e) => {
        e.preventDefault();
        // if (errorAuth) {
        //     dispatch(errorAction(''));
        // }

        if (errores.valido) {
            //setLoading(true);
            editarKeyMetodo();
        }
    };

    const crearKeyMetodo = async () => {
        const siExisteId = estadoInicial.lista.find(x => x.id === key.id);
        if (siExisteId) {
            alert("si existe");
        } else {
            const resultado = await actualizaDocumento(estadoInicial.coleccion, estadoInicial.id, { data: { keys: arrayUnion({ id: key.id, nombre: key.nombre, habilitado: key.habilitado }) } });
            if (resultado.confirma) {
                abrirCerrarModalCrear();
                llenarLista();
            }
        }
    };

    const editarKeyMetodo = async () => {
        // const resultado = await actualizaDocumento(estadoInicial.coleccion, estadoInicial.id, { data: { keys: arrayUnion({ id: key.id, nombre: key.nombre, habilitado: key.habilitado }) } });
        // if (resultado.confirma) {
        //     abrirCerrarModalCrear();
        //     llenarLista();
        // }

        const listaNueva = estadoInicial.lista.filter((x, i) => i !== key.index);
        if (listaNueva.find(x => x.id === key.id)) {
            alert("el id ya existe");
        } else {
            listaNueva.push({ id: key.id, nombre: key.nombre, habilitado: key.habilitado });
            const resultado = await actualizaDocumento(estadoInicial.coleccion, estadoInicial.id, { data: { keys: listaNueva } });
            if (resultado.confirma) {
                abrirCerrarModalEditar();
                llenarLista();
            }
        }
    };

    const editarSeleccion = async (idIndex) => {
        const objetoKey = await unDocumento(estadoInicial.coleccion, estadoInicial.id);

        if (objetoKey.confirma) {
            setKey({ ...objetoKey.result.keys[idIndex], index: idIndex });
            setModalEditar(!modalEditar);
        }
    };

    const habilarADesabilitar = () => {
        setKey({ ...key, habilitado: !key.habilitado });
    };

    return (
        <>
            <Container fluid>
                {/* BOTON MODAL CREAR KEY */}
                <h1 className={`${s.text_color_keys} text-center p-3 fw-bold`}>Administracion de Keys</h1>
                <Button variant='success mb-3' onClick={abrirCerrarModalCrear}>Crear Key</Button>
                <Row xs={2} sm={4} md={5} lg={6} xl={7} xxl={8} className="g-4 mb-3">
                    {
                        loading ? <CardLoading /> :
                            estadoInicial.lista.length ?
                                estadoInicial.lista.slice(inicio, fin).map((x) => (
                                    <Col key={x.id}>
                                        <Card className={`${s.card_keys} h-100 border-0`} onClick={() => editarSeleccion(estadoInicial.lista.findIndex(i => i.id === x.id))}>
                                            <Card.Body className='d-grid'>
                                                <Card.Img src={iconoGenero} className={`${s.img_keys} rounded-circle p-3`} />
                                                <Card.Text className={`${s.text_color_keys} fw-bold`}>ID {x.id}</Card.Text>
                                                <Card.Title className={`${s.text_color_keys} text-center fw-bold`}>{x.nombre}</Card.Title>
                                                <Badge bg={x.habilitado ? "success" : "danger"}>
                                                    {x.habilitado ? "Habilitado" : "Deshabilitado"}
                                                </Badge>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )) : <h1 >No hay beat</h1>
                    }
                </Row>
                <Pagination className='justify-content-center' >
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
            {/* MODAL CREAR KEY */}
            <Modal show={modalCrear} onHide={abrirCerrarModalCrear} backdrop="static" keyboard={false}>
                <Form onSubmit={onSubmitCrear}>
                    <Modal.Header closeButton>
                        <Modal.Title>Craer Key</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FloatingLabel className='mb-3' controlId='floatingInput' label='ID'>
                            <Form.Control name='id' type='number' placeholder='1 - 1000' onChange={onChangeKey} value={key.id} isInvalid={!!errores.id} />
                            <Form.Control.Feedback type={'invalid'}>{errores.id}</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel className='mb-3' controlId='floatingInput' label='Nombre'>
                            <Form.Control name='nombre' type='text' placeholder='C# algo' onChange={onChangeKey} value={key.nombre} isInvalid={!!errores.nombre} />
                            <Form.Control.Feedback type='invalid'>{errores.nombre}</Form.Control.Feedback>
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={abrirCerrarModalCrear}>Cancelar</Button>
                        <Button type='submit' variant="primary" onClick={onChangeKey}>Craer</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* MODAL EDITAR KEY */}
            <Modal show={modalEditar} onHide={abrirCerrarModalEditar} backdrop="static" keyboard={false}>
                <Form onSubmit={onSubmitEditar}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Key</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FloatingLabel className='mb-3' controlId='floatingInput' label='ID'>
                            <Form.Control name='id' type='number' placeholder='1 - 1000' onChange={onChangeKey} value={key.id} isInvalid={!!errores.id} />
                            <Form.Control.Feedback type={'invalid'}>{errores.id}</Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel className='mb-3' controlId='floatingInput' label='Nombre'>
                            <Form.Control name='nombre' type='text' placeholder='C# algo' onChange={onChangeKey} value={key.nombre} isInvalid={!!errores.nombre} />
                            <Form.Control.Feedback type='invalid'>{errores.nombre}</Form.Control.Feedback>
                        </FloatingLabel>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="button" variant={key.habilitado ? "btn btn-success" : "btn btn-danger"} onClick={habilarADesabilitar}>{key.habilitado ? "habilitado" : "desahabilitado"}</Button>
                        <Button variant="secondary" onClick={abrirCerrarModalEditar}>Cancelar</Button>
                        <Button type='submit' variant="primary" onClick={onChangeKey}>Editar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default Keys;