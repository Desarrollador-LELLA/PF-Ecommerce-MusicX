import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatingLabel, Placeholder } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import s from '../../css/InicioSesionCard.module.css';
import { validatePass } from "../../utils/InicioSesionErrors"
import { errorAction } from "../../redux/actions/authAction";
import { PasswordChange } from '../../utils/metodosFirebase';
import { useNavigate } from 'react-router-dom';

function ModalChangePas({ show, handleClose }) {
    const [loading, setLoading] = useState(false);
    const [contraseña, setContraseña] = useState();
    const [errors, setErrors] = useState({});
    const { errorAuth } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navegar = useNavigate()

    useEffect(() => {
        return () => {
            if (errorAuth) {
                dispatch(errorAction(''));
            }
        };
    }, [errorAuth, dispatch]);

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
            PasswordChange(contraseña, (retorno) => {
                alert(retorno.mensaje)
                setLoading(false)
                navegar(-1)
            })
        }
    };

    return (
        <>
            <Modal className={`my-3 ${s.container}`} show={show} onHide={handleClose}>

                <Modal.Header className={`my-3 ${s.container}`}>
                    <Modal.Title>Cambiar contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {loading ?

                            <>
                                <Placeholder as='p' animation='glow' >
                                    <Placeholder.Button xs={12} bg="black" bsPrefix={`${s.placeholderglow2} placeholder`} />
                                </Placeholder>
                            </>
                            :
                            <>

                                <FloatingLabel className='mb-3' controlId='floatingPassword' label='Nueva contraseña'>
                                    <Form.Control onChange={handleChangeContraseña} type='password' placeholder='Nueva contraseña' isInvalid={!!errors.contraseña} />
                                    <Form.Control.Feedback type='invalid'>{errors.contraseña}</Form.Control.Feedback>
                                </FloatingLabel>
                            </>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button className='float-end mb-3' variant='dark' onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button className='float-end mb-3' variant='dark' type='submit' onClick={handleSubmit} disabled={!contraseña || errors.contraseña}>
                        Guardar
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalChangePas;