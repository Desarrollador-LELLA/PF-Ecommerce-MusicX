import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form, Label, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import style from '../../css/productoCreate.module.css';
import { db } from '../../firebaseInicial/firebase';
import { collection, addDoc } from "firebase/firestore";


const ProductoCreate = () => {

    const navegar = useNavigate();
    const [producto, setProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
        key: "",
        tiempo: 0,
        imagen: ""
    });

    const [errores, setErrores] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ValidoProducto = ({ nombre, descripcion, precio, key, tiempo, imagen }) => {
        const e = {};
        let valido = true;
        const regex = /^[0-9].*$/;

        if (nombre.toString().trim().length === 0) {
            e.nombre = 'El nombre esta Vacio';
            valido = false;
        }
        else if (nombre.length > 30) {
            e.nombre = 'El nombre no puede tener mas de 30 Caracteres';
            valido = false;
        }

        if (descripcion.toString().trim().length === 0) {
            e.descripcion = 'La descripcion esta vacio';
            valido = false;
        }
        else if (descripcion.length > 30) {
            e.descripcion = 'La descripcion no puede tener mas de 30 Caracteres';
            valido = false;
        }

        if (key.toString().trim().length === 0) {
            e.key = 'El Key esta vacio';
            valido = false;
        }
        else if (key.length > 30) {
            e.key = 'El Key no puede tener mas de 30 Caracteres';
            valido = false;
        }

        if (regex.test(precio) !== true) {
            e.precio = 'El precio debe ser un numero o decimal';
            valido = false;
        }
        else if (precio.value === 0) {
            e.precio = 'El precio debe ser mayor a cero';
            valido = false;
        }

        if (tiempo.toString().trim().length === 0) {
            e.tiempo = 'El Tiempo esta Vacio';
            valido = false;
        }
        else if (regex.test(tiempo) !== true) {
            e.tiempo = 'El Tiempo debe ser un numero';
            valido = false;
        }
        else if (tiempo.value === 0) {
            e.tiempo = 'El Tiempo debe ser mayor a cero';
            valido = false;
        }

        return { ...e, valido };
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: value
        });

        setErrores(ValidoProducto({
            ...producto,
            [e.target.name]: e.target.value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (errores.valido) {
                await addDoc(collection(db, "productos"), { ...producto, deshabilitado: false });
                navigate("/producto_lista");
            }
        }
        catch (err) {
            console.log("Error generado :", err);
        }
    };

    return (
        <div>
            <Container className='my-3'>
                <Button onClick={() => navegar(-1)}>Volver</Button>
                <Card className={`${style.registroProducto} m-auto`}>
                    <Form className='card card-body' onSubmit={e => handleSubmit(e)}>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Nombre producto :</Form.Label>
                            <Form.Control name='nombre' className={`${style.textbox}`} type='text' placeholder='Ingrese nombre producto' onChange={handleInputChange} isInvalid={!!errores.nombre} />
                            <Form.Control.Feedback type={'invalid'}>{errores.nombre}</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Descripcion producto :</Form.Label>
                            <Form.Control name='descripcion' className={`${style.textbox}`} type='text' placeholder='Ingrese descripcion producto' onChange={handleInputChange} isInvalid={!!errores.descripcion} />
                            <Form.Control.Feedback type={'invalid'}>{errores.descripcion}</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Key producto :</Form.Label>
                            <Form.Control name='key' className={`${style.textbox}`} type='text' placeholder='Ingrese key producto' onChange={handleInputChange} isInvalid={!!errores.key} />
                            <Form.Control.Feedback type={'invalid'}>{errores.key}</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Precio producto :</Form.Label>
                            <Form.Control name='precio' className={`${style.textbox}`} type='text' placeholder='Ingrese precio producto' onChange={handleInputChange} isInvalid={!!errores.precio} />
                            <Form.Control.Feedback type={'invalid'}>{errores.precio}</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Tiempo producto :</Form.Label>
                            <Form.Control name='tiempo' className={`${style.textbox}`} type='number' placeholder='Ingrese tiempo producto' onChange={handleInputChange} isInvalid={!!errores.tiempo} />
                            <Form.Control.Feedback type={'invalid'}>{errores.tiempo}</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Imagen producto :</Form.Label>
                            <Form.Control name='imagen' className={`${style.textbox} float-right`} type='text' placeholder='Ingrese url producto' onChange={handleInputChange} isInvalid={!!errores.imagen} />
                            <Form.Control.Feedback type={'invalid'}>{errores.imagen}</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3'>
                            <Button className={`${style.button} text-center btn btn-primary`} type='submit' variant='primary' >Registrar</Button>
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default ProductoCreate;
