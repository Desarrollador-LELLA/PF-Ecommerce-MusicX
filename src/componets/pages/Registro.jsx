import React from 'react';
import { Button, Card, Container, FloatingLabel, Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import s from '../../css/registro.module.css';
import icLogo from '../images/ic_logo_tester.svg';

const Registro = () => {
    return (
        <Container className='my-2'>
            <Card className={`${s.registrocard} m-auto`}>
                <Card.Body>
                    <div className='text-center'>
                        <Image className='btn-primary' rounded={false} src={icLogo} width='100px' />
                    </div>

                    <Card.Title className='text-center my-3'>Registrarme</Card.Title>
                    <Form>
                        <FloatingLabel className='mb-3' controlId='floatingInput' label='Nombre'>
                            <Form.Control type='text' placeholder='Juan' />
                        </FloatingLabel>
                        <FloatingLabel className='mb-3' controlId='floatingInput' label='Apellido'>
                            <Form.Control type='text' placeholder='Perez' />
                        </FloatingLabel>
                        <FloatingLabel className='mb-3' controlId='floatingInput' label='Correo Electronico'>
                            <Form.Control type='email' placeholder='micorreo@example.com' />
                        </FloatingLabel>
                        <FloatingLabel className='mb-3' controlId='floatingPassword' label='Contraseña'>
                            <Form.Control type='password' placeholder='Contraseña' />
                        </FloatingLabel>
                        <Button className='float-end' variant='primary' type='submit'>
                            Registrarme
                        </Button>
                    </Form>
                    <Link className='navbar-brand text-success' to='#'>
                        Ya tengo una Cuenta
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Registro;