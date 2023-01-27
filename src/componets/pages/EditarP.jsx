import React, { useEffect, useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form, Image, Placeholder } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import s from '../../css/registro.module.css';
import icLogo from '../images/ic_logo_tester.png';
import { ValidoEditarU } from '../../utils/validaciones';
import { actualizaDocumento } from '../../utils/metodosFirebase';


const INIT_STATE = {
    nombre: '',
    apellido: '',

};
const EditarU = () => {
    //ALL
    const [editar, setEditar] = useState(INIT_STATE);
    const [errores, setErrores] = useState({});
    const [loading, setLoading] = useState(false);
    const edit2 = useParams()

    



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
            const edit = await actualizaDocumento("usuarios", edit2.id, {data: editar})
            if (edit.confirma){
                console.log("Cambio hecho")
            }
            setLoading(false)
            // dispatch(registraAction(editar, () => setLoading(false)));
        }
    };
return (
    <Container className={`my-4 ${s.container}`}>
        {console.log(edit2)}
        <Card className={`${s.editarcard} m-auto`}>
            <Card.Body>
                <div className='text-center'>
                    <Image className='btn-primary' src={icLogo} width='100px' />
                </div>
                <Card.Title className='text-center my-3 text-white'>Editar Información</Card.Title>
                <Form onSubmit={onSubmit}>
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
                                        <Placeholder.Button xs={4} bg="dark float-end mb-3" />
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
                                     <Button className='float-end mb-3' variant='dark' type='submit' onClick={onChange}>
                                        Guardar
                                    </Button>
                                </>
                        }
                    </Form>
                    <Link className='navbar-brand text-success' to='/Perfil'>
                    </Link>
                    {/* {errorAuth && <Badge bg="danger">{errorAuth}</Badge>} */}
                </Card.Body>
            </Card>
        </Container>
    );
};
export default EditarU