import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Badge, Button, Card, Container, FloatingLabel, Form, Image } from 'react-bootstrap';
import s from '../../css/InicioSesionCard.module.css';
import icLogo from '../images/ic_logo_tester.png';
import { errorAction, signInAction } from "../../redux/actions/authAction";
import { useDispatch, useSelector } from 'react-redux';
import { catchInicio, validateMail, validatePass } from '../../utils/InicioSesionErrors';

export default function InicioSesion() {

    const dispatch = useDispatch();

    const [correo, setCorreo] = useState();
    const [contraseña, setContraseña] = useState();
    const [errors, setErrors] = useState({});
    const { errorAuth } = useSelector(state => state.auth);

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
            dispatch(signInAction({ correo, contraseña }, () => { }));
        }

        // dispatch(signInAction({ correo, contraseña }, () => { }));
    };
    
    return (
        
        <Container className='my-5'>
            <Card className={`${s.iniciosesioncard} m-auto`}>
            {errors.contraseña ?  <Badge bg="danger">{errors.contraseña}</Badge> : <span></span>}
            {errors.correo ? <Badge bg="danger">{errors.correo}</Badge> : <span></span>}
                <Card.Body>
                    <div className='text-center'>
                        <Image className='btn-primary' rounded={false} src={icLogo} width='100px' />
                    </div>

                    <Card.Title className='text-center my-3'>Iniciar Sesión</Card.Title>
                    <Form>
                        <FloatingLabel className='mb-3' controlId='floatingInput' label='Correo Electronico'>
                            <Form.Control onChange={handleChangeCorreo} type='correo' placeholder='micorreo@example.com' />
                        </FloatingLabel>
                        <FloatingLabel className='mb-3' controlId='floatingPassword' label='Contraseña'>
                            <Form.Control onChange={handleChangeContraseña} type='password' placeholder='Contraseña' />
                        </FloatingLabel>
                        <Button onClick={(event) => handleSubmit(event)} className='float-end' variant='primary' type='submit'
                            disabled={
                                !correo ||
                                !contraseña ||
                                errors.correo ||
                                errors.contraseña
                            }>
                            Iniciar Sesión
                        </Button>
                    </Form>
                    <Button variant='primary'>
                    <Link className='navbar-brand' to='/registro'>
                        Quiero Registrarme
                    </Link>
                    </Button>
                    {errorAuth && <Badge bg="danger">{errorAuth}</Badge>}
                </Card.Body>
            </Card>
        </Container>
    );
}
