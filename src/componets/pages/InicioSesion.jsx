import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container, FloatingLabel, Form, Image } from 'react-bootstrap';
import s from '../../css/registro.module.css';
import icLogo from '../images/ic_logo_tester.png';
import { signInAction } from "../../redux/actions/authAction";
import { useDispatch } from 'react-redux';
import { validateMail, validatePass } from './Errors/InicioSesionErrors';

export default function InicioSesion() {

    const dispatch = useDispatch();

    const [correo, setCorreo] = useState();
    const [contraseña, setContraseña] = useState();
    const [errors, setErrors] = useState({});

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
        dispatch(signInAction({ correo, contraseña }, () => { }));
    };

    return (

        <Container className='my-2'>
            <Card className={`${s.registrocard} m-auto`}>
                <Card.Body>
                    <div className='text-center'>
                        <Image className='btn-primary' rounded={false} src={icLogo} width='100px' />
                    </div>

                    <Card.Title className='text-center my-3'>Iniciar Sesión</Card.Title>
                    <Form>
                        <FloatingLabel className='mb-3' controlId='floatingInput' label='Correo Electronico'>
                            <Form.Control onChange={handleChangeCorreo} type='correo' placeholder='micorreo@example.com' />
                        </FloatingLabel>
                        {errors.correo ? <span>{errors.correo}</span> : <span></span>}
                        <FloatingLabel className='mb-3' controlId='floatingPassword' label='Contraseña'>
                            <Form.Control onChange={handleChangeContraseña} type='password' placeholder='Contraseña' />
                        </FloatingLabel>
                        {errors.contraseña ? <span>{errors.contraseña}</span> : <span></span>}
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
                    <Link className='navbar-brand text-success' to='/registro'>
                        Quiero Registrarme
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    );
}
