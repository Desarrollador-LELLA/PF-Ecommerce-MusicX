import React, { useEffect, useState } from 'react'
import { Button, Card, Container, FloatingLabel, Form, Label, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from '../../css/productoCreate.module.css';

/*
import { db } from '../../firebaseInicial/firebase';
import * as allDb from 'firebase/firestore';
*/

import { db } from '../../firebaseInicial/firebase';
import { collection, addDoc } from "firebase/firestore"; 


const ProductoCreate = () => {

    const [producto, setProducto] = useState({
        nombre: "",
        descripcion: "",
        key: "",
        tiempo: 0,
        imagen: ""
    });

    const [errores, setErrores] = useState({});
    const { errorAuth } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    /*
    useEffect(() => {
        return () => {
            if (errorAuth) {
                dispatch(errorAction(''));
            }
        };
    }, [errorAuth, dispatch]);
    */


    const ValidoProducto = ({ nombre, descripcion, key, tiempo, imagen }) => {
        const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        const e = {};
        let valido = true;

        if (nombre.toString().trim().length === 0) {
            e.nombre = 'El Nombre esta Vacio';
            valido = false;
        } else if (nombre.length > 30) {
            e.nombre = 'El Nombre no puede tener mas de 30 Caracteres';
            valido = false;
        }

        if (descripcion.toString().trim().length === 0) {
            e.descripcion = 'La Descripcion esta Vacio';
            valido = false;
        } else if (descripcion.length > 30) {
            e.descripcion = 'La Descripcion no puede tener mas de 30 Caracteres';
            valido = false;
        }

        if (key.toString().trim().length === 0) {
            e.key = 'El Key esta vacio';
            valido = false;
        } else if (key.length > 30) {
            e.key = 'El Key no puede tener mas de 30 Caracteres';
            valido = false;
        }

        if (tiempo.toString().trim().length === 0) {
            e.tiempo = 'El Tiempo esta Vacio';
            valido = false;
        } else if (tiempo.value === 0) {
            e.tiempo = 'El Tiempo debe ser mayor a cero';
            valido = false;
        }

        return { ...e, valido };
    }


    const handleInputChange = e => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: value
        });

        setErrores(ValidoProducto({
            ...producto,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try
        {
            await addDoc(collection(db, "productos"), { producto });
            console.log('new product added');
        }
        catch(err)
        {
            console.log("Error generado :", err);
        }
    }

    return (
        <div>
            <Container className='my-3'>
                <Card className={ `${ style.registroProducto } m-auto` }>
                    <Form className='card card-body' onSubmit={ e => handleSubmit(e) }>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Nombre producto :</Form.Label>
                            <Form.Control name='nombre' className={ `${ style.textbox }` } type='text' placeholder='Ingrese nombre producto' onChange={ handleInputChange } isInvalid={!!errores.nombre} />
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Descripcion producto :</Form.Label>
                            <Form.Control name='descripcion' className={ `${ style.textbox }` } type='text' placeholder='Ingrese descripcion producto' onChange={ handleInputChange } isInvalid={!!errores.descripcion} />
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Key producto :</Form.Label>
                            <Form.Control name='key' className={ `${ style.textbox }` } type='text' placeholder='Ingrese key producto' onChange={ handleInputChange } isInvalid={!!errores.key} />
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Tiempo producto :</Form.Label>
                            <Form.Control name='tiempo' className={ `${ style.textbox }` } type='number' placeholder='Ingrese tiempo producto' onChange={ handleInputChange } isInvalid={!!errores.tiempo} />
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Imagen producto :</Form.Label>
                            <Form.Control name='imagen' className={ `${ style.textbox } float-right` } type='text' placeholder='Ingrese url producto' onChange={ handleInputChange } isInvalid={!!errores.imagen} />
                        </div>
                        <input className={ `${ style.button } text-center btn btn-primary float-end` } type='submit' variant='primary' value='Registrar' />
                        {/*
                        <Button className={ `${ style.button } text-center btn btn-primary float-end` } type='submit' variant='primary' >Registrar</Button>                    
                        */}
                    </Form>
                </Card>
            </Container>
        </div>
    )
}

export default ProductoCreate;
