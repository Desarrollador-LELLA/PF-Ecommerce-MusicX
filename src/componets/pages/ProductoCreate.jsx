import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form, Label, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import style from '../../css/productoCreate.module.css';
import { db, storage, allStor, stor } from '../../firebaseInicial/firebase';
import { collection, addDoc } from "firebase/firestore"; 

//      Subir imagenes
/*
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { v4 } from "uuid";
*/
import { actualizaDocumento, crearDocumento, subirArchivoMetodo } from '../../utils/metodosFirebase';


const ProductoCreate = () => {

    const navegar = useNavigate();
    const [imagen, setImagen] = useState(null);

    const [producto, setProducto] = useState({
        nombre: "",
        autor: "",
        descripcion: "",
        precio: 0,
        key: "",
        tiempo: 0,
        //imagen: null
    });


    const [url, setURL] = useState(null);
    const [errores, setErrores] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();


    //  Segundo ejemplo
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    

    const ValidoProducto = ({ nombre, autor, descripcion, precio, key, tiempo, imagen }) => {
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

        if (autor.toString().trim().length === 0)
        {
            e.autor = 'El autor esta Vacio';
            valido = false;
        }
        else if (autor.length > 30)
        {
            e.autor = 'El autor no puede tener mas de 30 Caracteres';
            valido = false;
        }

        if (descripcion.toString().trim().length === 0)
        {
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


    const handleSubirImagen = async (e) => {
        setImagen(e.target.files[0]);
    }


    const handleSubmit = async (e) => {
        try
        {
            e.preventDefault();

            if(errores.valido)
            {
                /*      TERCER CODIGO       */
                let prod = await crearDocumento("productos", { data: producto });
                console.log(imagen);

                const extension = imagen.type.substring(6, imagen.type.length)
                let ruta = `productos/${ prod.result.id }/beat.${extension}`
                
                subirArchivoMetodo(ruta, (url) => {
                    console.log(url);
                    actualizaDocumento("productos", prod.result.id, { data: { imagen: url } })
                });


                /*          PRIMER CODIGO
                const imageRef = ref(storage, "image.jpg");
                /*
                const imageRef = ref(stor, "image.jpg");

                uploadBytes(imageRef, producto.imagen, {
                    contentType: 'image/jpeg'
                }).then( () => {
                    setURL(url);
                }).catch( (err) => {
                    console.log("Error generado 1 :", err);
                });
                
                await addDoc(collection(db, "productos"), { ...producto, deshabilitado: false });
                navigate("/producto_lista");
                
                console.log(producto);
                console.log(imageRef);
                console.log(producto.imagen);
                */


                //  const imageRef = ref(stor, `images/${ producto.imagen }`);

                /*      SEGUNDO CODIGO
                const imageRef = ref(storage, `images/${ imageUpload.name + v4() }`);
                const imageRef = ref(stor, `images/${ imageUpload.name + v4() }`);

                uploadBytes(imageRef, imageUpload).then( () => {
                    setURL(url);
                }).catch( (err) => {
                    console.log("Error generado 1 :", err);
                });

                await addDoc(collection(db, "productos"), { ...producto, deshabilitado: false });
                console.log(producto);
                console.log(imageRef);
                console.log(producto.imagen);
                */



            }
        }
        catch(err)
        {
            console.log("Error generado 2 :", err);
        }
    };


    return (
        <div>
            <Container className='my-3'>
                <Card className={ `${ style.registroProducto } m-auto` }>
                    <Form className='card card-body' onSubmit={ e => handleSubmit(e) }>
                        <div className={ style.productoCreate_title }>Creacion de Producto (Admin)</div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Nombre producto :</Form.Label>
                            <Form.Control name='nombre' type='text' className={ `${ style.textbox }` } placeholder='Ingrese nombre producto' onChange={ handleInputChange } isInvalid={!!errores.nombre} />
                            <Form.Control.Feedback type={'invalid'}>{ errores.nombre }</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Autor producto :</Form.Label>
                            <Form.Control name='autor' type='text' className={ `${ style.textbox }` } placeholder='Ingrese autor producto' onChange={ handleInputChange } isInvalid={!!errores.autor} />
                            <Form.Control.Feedback type={'invalid'}>{ errores.autor }</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Descripcion producto :</Form.Label>
                            <Form.Control name='descripcion' type='text' className={ `${ style.textbox }` } placeholder='Ingrese descripcion producto' onChange={ handleInputChange } isInvalid={!!errores.descripcion} />
                            <Form.Control.Feedback type={'invalid'}>{ errores.descripcion }</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Key producto :</Form.Label>
                            <Form.Control name='key' type='text' className={ `${ style.textbox }` } placeholder='Ingrese key producto' onChange={ handleInputChange } isInvalid={!!errores.key} />
                            <Form.Control.Feedback type={'invalid'}>{ errores.key }</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Precio producto :</Form.Label>
                            <Form.Control name='precio' type='text' className={ `${ style.textbox }` } placeholder='Ingrese precio producto' onChange={ handleInputChange } isInvalid={!!errores.precio} />
                            <Form.Control.Feedback type={'invalid'}>{ errores.precio }</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Tiempo producto :</Form.Label>
                            <Form.Control name='tiempo' type='number' className={ `${ style.textbox }` } placeholder='Ingrese tiempo producto' onChange={ handleInputChange } isInvalid={!!errores.tiempo} />
                            <Form.Control.Feedback type={'invalid'}>{ errores.tiempo }</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Imagen producto :</Form.Label>
                            {/*
                            <Form.Control name='imagen' type='text' className={ `${ style.textbox } float-right` } placeholder='Ingrese url producto' onChange={ handleInputChange } isInvalid={!!errores.imagen} />
                            <input name='imagen' type='file' onChange={ (e) => setImageUpload(e.target.values[0]) } />
                            */}


                            {/* <input name='imagen' type='file' onChange={ handleInputChange } />  */}
                            <Form.Control type="file" accept="image/png, image/jpg, image/jpeg" onChange={ handleSubirImagen } />
                            <Form.Control.Feedback type={'invalid'}>{ errores.imagen }</Form.Control.Feedback>
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
