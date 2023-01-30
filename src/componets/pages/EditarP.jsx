import React, { useEffect, useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form, Image, Placeholder } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import s from '../../css/editarperfil.module.css';
import icLogo from '../images/ic_logo_tester.png';
import { ValidoEditarU } from '../../utils/validaciones';
import { actualizaDocumento } from '../../utils/metodosFirebase';



const INIT_STATE = {
    nombre: '',
    apellido: '',
    descripcion: '',

};
const EditarU = () => {
    //ALL
    const [editar, setEditar] = useState(INIT_STATE);
    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);
    const edit2 = useParams()
    const navegar = useNavigate()





    const onChange = (e) => {
        setEditar({
            ...editar,
            [e.target.name]: e.target.value
        });

        setErrores(ValidoEditarU({
            ...editar,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (errores.valido) {
            setLoading(true);
            const edit = await actualizaDocumento("usuarios", edit2.id, { data: { nombre: editar.nombre, apellido: editar.apellido, descripcion: editar.descripcion } })
            if (edit.confirma) {
                console.log("Cambio hecho")
            }
            setLoading(false)
            alert("Datos guardados!")
            navegar(-1)
            // dispatch(registraAction(editar, () => setLoading(false)));
        }
    };
    return (
        <Container className={`my-3 ${s.container}`}>
            <Card className={`${s.editarperfil} m-auto`}>
                <Card.Body>
                    <div className='text-center'>
                        <Image className='btn-primary' src={icLogo} width='100px' />
                    </div>
                    <Card.Title className='text-center my-4 text-white'>Editar Información</Card.Title>
                    <Form onSubmit={onSubmit}>
                        {
                            loading ?
                                <>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={12} bg="black" bsPrefix={`${s.placeholderglow2} placeholder`} />
                                    </Placeholder>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={12} bg="black" bsPrefix={`${s.placeholderglow2} placeholder`} />
                                    </Placeholder>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={12} bg="black" bsPrefix={`${s.placeholderglow2} placeholder`} />
                                    </Placeholder>
                                    <Placeholder as='p' animation='glow' >
                                        <Placeholder.Button xs={2} bg="dark float-end mb-3" />
                                    </Placeholder>
                                </>
                                :
                                <>
                                    <FloatingLabel className='mb-3' controlId='floatingInput' label='Nombre'>
                                        <Form.Control name='nombre' type='text' placeholder='Juan' onChange={onChange} value={editar.nombre} isInvalid={!!errores.nombre} />
                                        <Form.Control.Feedback type={'invalid'}>{errores.nombre}</Form.Control.Feedback>
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId='floatingInput' label='Apellido'>
                                        <Form.Control name='apellido' type='text' placeholder='Perez' onChange={onChange} value={editar.apellido} isInvalid={!!errores.apellido} />
                                        <Form.Control.Feedback type='invalid'>{errores.apellido}</Form.Control.Feedback>
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId='floatingInput' label='Descripción'>
                                        <Form.Control name='descripcion' as="textarea" rows="3" placeholder='Escribe algo sobre ti...' onChange={onChange} value={editar.descripcion} isInvalid={!!errores.descripcion} />
                                        <Form.Control.Feedback type={'invalid'}>{errores.descripcion}</Form.Control.Feedback>
                                    </FloatingLabel>
                                    <Button className='float-end mb-3' variant='dark' type='submit' onClick={onChange}>
                                        Guardar
                                    </Button>
                                </>
                        }
                    </Form>
                    <Link className='navbar-brand text-success' to='/Perfil'>
                    </Link>

                </Card.Body>
            </Card>
        </Container>
    );
};
export default EditarU