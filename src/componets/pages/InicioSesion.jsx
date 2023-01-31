import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, Container, FloatingLabel, Form, Image, Placeholder } from 'react-bootstrap';
import s from '../../css/InicioSesionCard.module.css';
import icLogo from '../images/ic_logo_tester.png';
import { errorAction, signInAction, registraGoogleAction } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from 'react-redux';
import { validateMail, validatePass } from '../../utils/InicioSesionErrors';
import icGoogle from '../images/ic_google.svg';

export default function InicioSesion() {

    const dispatch = useDispatch();

    const [correo, setCorreo] = useState();
    const [contraseña, setContraseña] = useState();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { errorAuth } = useSelector(state => state.auth);

    useEffect(() => {
        return () => {
            if (errorAuth) {
                dispatch(errorAction(''));
            }
        };
    }, [errorAuth, dispatch]);

    const handleChangeCorreo = (event) => {
        event.preventDefault();
        setCorreo(event.target.value);
        setErrors(validateMail({ ...correo, [event.target.type]: event.target.value }));
    };
    const handleChangeContraseña = (event) => {
        event.preventDefault();
        setContraseña(event.target.value);
        setErrors(validatePass({ ...contraseña, [event.target.type]: event.target.value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (errorAuth) {
            dispatch(errorAction(''));
        }

        if (errors) {
            setLoading(true);
            dispatch(signInAction({ correo, contraseña }, () => setLoading(false)));
        }
    };

    const onChangeGoogle = async (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(registraGoogleAction(() => setLoading(false)));
    };

    return (

        <Container className='my-4'>
            <Card className={`${s.iniciosesioncard} m-auto border-0`}>               
                <Card.Body className='d-grid'>
                    <div className='text-center'>
                        <Image className='btn-primary' rounded={false} src={icLogo} width='100px' />
                    </div>
                    <Card.Title className='text-center my-3 text-white'>Iniciar Sesión</Card.Title>
                    <Form className='d-grid'>
                        {
                            loading ?
                                <>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={12} bg="light" bsPrefix={`${s.placeholderglow} placeholder`} />
                                    </Placeholder>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={12} bg="light" bsPrefix={`${s.placeholderglow} placeholder`} />
                                    </Placeholder>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={12} bg="dark float-end" />
                                    </Placeholder>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={12} bg="dark float-end mb-3" />
                                    </Placeholder>
                                </>
                                :
                                <>
                                    <FloatingLabel className='mb-3' controlId='floatingInput' label='Correo Electronico'>
                                        <Form.Control onChange={handleChangeCorreo} type='correo' placeholder='micorreo@example.com' isInvalid={!!errors.correo} />
                                        <Form.Control.Feedback type='invalid'>{errors.correo}</Form.Control.Feedback>
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId='floatingPassword' label='Contraseña'>
                                        <Form.Control onChange={handleChangeContraseña} type='password' placeholder='Contraseña' isInvalid={!!errors.contraseña} />
                                        <Form.Control.Feedback type='invalid'>{errors.contraseña}</Form.Control.Feedback>
                                    </FloatingLabel>
                                    <Button onClick={(event) => handleSubmit(event)} className='mb-3' variant='dark' type='submit'
                                        disabled={
                                            !correo ||
                                            !contraseña ||
                                            errors.correo ||
                                            errors.contraseña
                                        }>
                                        Iniciar Sesión
                                    </Button>
                                    <Button className='mb-3' variant='dark' type='button' onClick={onChangeGoogle}>
                                        <Image src={icGoogle} />
                                        <span className='ms-3'>Iniciar Sesion con Google</span>
                                    </Button>
                                </>
                        }
                    </Form>
                    <Link className='navbar-brand text-success mb-3' to='/registro'>
                        Quiero Registrarme
                    </Link>
                    {errorAuth && <Badge bg="danger">{errorAuth}</Badge>}
                </Card.Body>
            </Card>
        </Container>
    );
}
