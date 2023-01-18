import React, { useState } from 'react'
import { Button, Card, Container, FloatingLabel, Form, Label, Image } from 'react-bootstrap';
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
        imagen: "",
        descripcion: "",
        key: "",
        tiempo: 0
    });

    const handleInputChange = e => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: value
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try
        {
            /*
            let addProducto = async(Object) => {
                await addDoc(collection(db, "productos"), { producto });
                console.log('new product added');
            }
            */

            await addDoc(collection(db, "productos"), { producto });
            console.log('new product added');
        }
        catch(err)
        {
            console.log("Error generado :", err);
        }
    
        /*
        let addProducto = async(Object) => {
            await db.collection('productos').doc().set(Object);
            console.log('new product added');
        }
        */
    }

    return (
        <div>
            <Container className='my-3'>
                <Card className={ `${ style.registroProducto } m-auto` }>
                    <Form className='card card-body' onSubmit={ e => handleSubmit(e) }>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Nombre producto :</Form.Label>
                            <Form.Control name='nombre' className={ `${ style.textbox }` } type='text' placeholder='Ingrese nombre producto' value={ producto.nombre } onChange={ handleInputChange } />
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Imagen producto :</Form.Label>
                            <Form.Control name='imagen' className={ `${ style.textbox } float-right` } type='text' placeholder='Ingrese url producto' onChange={ handleInputChange } />
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Descripcion producto :</Form.Label>
                            <Form.Control name='descripcion' className={ `${ style.textbox }` } type='text' placeholder='Ingrese descripcion producto' onChange={ handleInputChange } />
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Key producto :</Form.Label>
                            <Form.Control name='key' className={ `${ style.textbox }` } type='text' placeholder='Ingrese key producto' onChange={ handleInputChange } />
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Tiempo producto :</Form.Label>
                            <Form.Control name='tiempo' className={ `${ style.textbox }` } type='number' placeholder='Ingrese tiempo producto' onChange={ handleInputChange } />
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
