import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { detalle_producto_admin } from '../../redux/actions/productoAction';
import style from '../../css/ProductoDetalle.module.css';
import { useParams } from 'react-router-dom';
import { db } from '../../firebaseInicial/firebase';
import { collection, addDoc, updateDoc } from "firebase/firestore";


const ProductoDetalle = () => {

    const [producto, setProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
        key: "",
        tiempo: 0,
        imagen: ""
    });

    const navigate = useNavigate();

    const [detalle, setDetalle] = useState({});

    const params = useParams();
    const id = params.id.trim();

    const detallado = async () => {
        let ayuda = await detalle_producto_admin(id);
        setDetalle(ayuda);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProducto({
            ...producto,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(collection(db, "productos"), producto);
            console.log("Edicion");
            navigate("/producto_lista");
        }
        catch (err) {
            console.log("Error generado :", err);
        }
    };

    useEffect(() => {
        detallado();
    }, []);

    return (
        <div>
            <Container className='my-3'>
                <Button onClick={() => navigate(-1)}>Volver</Button>
                <Card className={`${style.detalleProducto} m-auto`} >
                    <Form className='card card-body' onSubmit={e => handleSubmit(e)}>
                        <div className={style.productoDetail_title}>Detalle de Producto</div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Nombre :</Form.Label>
                            <Form.Control name='nombre' placeholder={detalle?.nombre} className={`${style.textbox}`} type='text' onChange={handleInputChange} />
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Descripcion :</Form.Label>
                            <Form.Control name='descripcion' placeholder={detalle?.descripcion} className={`${style.textbox}`} type='text' onChange={handleInputChange} />
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Precio :</Form.Label>
                            <Form.Control name='precio' placeholder={detalle?.precio} className={`${style.textbox}`} type='text' onChange={handleInputChange} />
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Key :</Form.Label>
                            <Form.Control name='key' placeholder={detalle?.key} className={`${style.textbox}`} type='text' onChange={handleInputChange} />
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Tiempo :</Form.Label>
                            <Form.Control name='tiempo' placeholder={detalle?.tiempo} className={`${style.textbox}`} type='text' onChange={handleInputChange} />
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Imagen :</Form.Label>
                            <Form.Control name='nombre' placeholder={detalle?.imagen} className={`${style.textbox}`} type='text' onChange={handleInputChange} />
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <img src={detalle?.imagen} alt='' width="80px" height="80px" />
                        </div>
                        <div>
                            <Button className={`${style.button} text-center btn btn-primary float-end`} type='submit' variant='primary'>Editar</Button>
                        </div>
                        {/*
                        <input className={ `${ style.button } text-center btn btn-primary float-end` } type='submit' variant='primary' value='Editar' />
                        */}
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default ProductoDetalle;
