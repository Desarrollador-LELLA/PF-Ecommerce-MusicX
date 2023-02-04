import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { detalle_producto_admin } from '../../redux/actions/productoAction';
import style from '../../css/ProductoDetalle.module.css';
import { useParams } from 'react-router-dom';
import { db } from '../../firebaseInicial/firebase';
import { doc, updateDoc } from "firebase/firestore"; 
import { unDocumentoCallback } from '../../utils/metodosFirebase';


const ProductoDetalle = () => {

    const [detalle, setDetalle] = useState({
        nombre: "",
        autor: "",
        descripcion: "",
        key: "",
        tiempo: 0,
        imagen: ""
    });


    //  Aqui traigo los keys
    const [keys, setKeys] = useState([]);

    const llenarKeys = async () => {
        await unDocumentoCallback("keys", "dogKeys", (retorno) => {
            setKeys(retorno.result.keys)
        });
    };


    //  Aqui traigo los generos
    const [generos, setGeneros] = useState([]);

    const llenarGeneros = async ()=>{
        await unDocumentoCallback("generos", "docGenero", (retorno) => {
            setGeneros(retorno.result.generos);
        });
    }


    //  useState de Imagen
    const [imagen, setImagen] = useState(null);

    const [errores, setErrores] = useState({});
    const navigate = useNavigate();



    const [selected, setSelected] = useState("All");


    //  Aqui uso el ID traido para llenar los datos
    const params = useParams();
    const id = params.id.trim();

    const detallado = async () => {
        let ayuda = await detalle_producto_admin(id);
        setDetalle({ ...ayuda });
        
        /*
        console.log("Ayuda", ayuda);
        console.log("Detalle", detalle);        
        console.log("Detalle 2", detalle);
        console.log("Hoy", ayuda.licencias);
        */
    }


    const ValidoProducto = ({ nombre, autor, descripcion, key, tiempo, imagen }) => {
        const e = {};
        let valido = true;
        const regex = /^[0-9].*$/;

        if (nombre.toString().trim().length === 0)
        {
            e.nombre = 'El nombre esta Vacio';
            valido = false;
        }
        else if (nombre.length > 30)
        {
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
        else if (descripcion.length > 30)
        {
            e.descripcion = 'La descripcion no puede tener mas de 30 Caracteres';
            valido = false;
        }

        if (key.toString().trim().length === 0)
        {
            e.key = 'El Key esta vacio';
            valido = false;
        }
        else if (key.length > 30)
        {
            e.key = 'El Key no puede tener mas de 30 Caracteres';
            valido = false;
        }

        if (tiempo.toString().trim().length === 0)
        {
            e.tiempo = 'El Tiempo esta Vacio';
            valido = false;
        }
        else if(regex.test(tiempo) !== true)
        {
            e.tiempo = 'El Tiempo debe ser un numero';
            valido = false;
        }
        else if (tiempo.value === 0)
        {
            e.tiempo = 'El Tiempo debe ser mayor a cero';
            valido = false;
        }

        return { ...e, valido };
    }


    //  Aqui se sube la imagen
    const handleSubirImagen = async (e) => {
        setImagen(e.target.files[0]);
    };


    /*      Uso de useEffect         */
    useEffect( () => {
        detallado();
    
        //  Aqui cargale los selectbox
        llenarGeneros();
        llenarKeys();
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDetalle({
            ...detalle,
            [name]: value
        });
    };


    /*
    function handlerLicencia(e) {
        let btnSelec = document.getElementById(e.target.id).parentNode;
        let boton = document.getElementById(e.target.id).childNodes;
        boton[1].style.display = "block";
        btnSelec.setAttribute(
        "Class",
        `card ${css.cardProducto} ${css.cardSelect}`
        );
        precioTotal(e.target.id);
        for (let i = 0; i < arryAux.length; i++) {
        if (i != e.target.id) {
            let btnNoSelect = document.getElementById(i).parentNode;
            let botonNoSelect = document.getElementById(i).childNodes;
            botonNoSelect[1].style.display = "none";
            btnNoSelect.setAttribute("Class", `card ${css.cardProducto}`);
        }
        }
    }
    */


    const handleSubmit = async (e) => {
        e.preventDefault();
        try
        {
            const docRef = doc(db, "productos", id);
            await updateDoc(docRef, { ...detalle });
            navigate("/producto_lista");
        }
        catch(err)
        {
            console.log("Error generado : ", err);
        }
    };


    return (
        <div>
            <Container className='my-3'>
                <Card className={ `${ style.detalleProducto } m-auto` } >
                    {
                        console.log("Ultimate", detalle)
                    }
                    <Form className='card card-body' onSubmit={ e => handleSubmit(e) }>
                        <div className={ style.productoDetail_title }>Detalle de Producto (Admin)</div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Nombre producto :</Form.Label>
                            <Form.Control name='nombre' type='text' value={ detalle?.nombre } className={ `${ style.textbox }` } onChange={ handleInputChange } />
                            <Form.Control.Feedback type={'invalid'}>{ errores.nombre }</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Autor producto :</Form.Label>
                            <Form.Control name='autor' type='text' value={ detalle?.autor } className={ `${ style.textbox }` } onChange={ handleInputChange } />
                            <Form.Control.Feedback type={'invalid'}>{ errores.nombre }</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Descripcion producto :</Form.Label>
                            <Form.Control name='descripcion' type='text' value={ detalle?.descripcion } className={ `${ style.textbox }` } onChange={ handleInputChange } />
                            <Form.Control.Feedback type={'invalid'}>{ errores.nombre }</Form.Control.Feedback>
                        </div>
                        <div className="form-group input-group input-group-text my-3 d-flex justify-content-between">
                            <Form.Label>Genero producto :</Form.Label>
                            <Form.Select name="genero" className={`${style.selectbox}`}>
                                <option hidden>Select genero</option>
                                <option value="All">All</option>
                                {
                                    generos.length ?
                                    generos.map(e => (
                                        <option key={e.nombre} value={e.nombre}>
                                            {e.nombre}
                                        </option>
                                    )) :
                                    null
                                }
                            </Form.Select>
                        </div>

                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Key producto :</Form.Label>
                            <Form.Select name="key" className={`${style.selectbox}`} selected={ setSelected } >
                                <option hidden>Select key</option>
                                <option value="All">All</option>
                                {
                                    keys.length ?
                                    keys.map(e => (
                                        <option key={e.nombre} value={e.nombre} >
                                            {e.nombre}
                                        </option>
                                    )) :
                                    null
                                }
                            </Form.Select>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Tiempo producto :</Form.Label>
                            <Form.Control name='tiempo' type='number' value={ detalle?.tiempo } className={ `${ style.textbox }` } onChange={ handleInputChange } />
                            <Form.Control.Feedback type={'invalid'}>{ errores.nombre }</Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <Form.Label>Imagen producto :</Form.Label>
                            <Form.Control
                                className={`${style.filebox}`}
                                type="file"
                                accept="image/png, image/jpg, image/jpeg"
                                onChange={ handleSubirImagen }
                            />
                            <br />
                            <Form.Control.Feedback type={"invalid"}>
                                {errores.imagen}
                            </Form.Control.Feedback>

                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <img src={detalle?.imagen} alt='' width="80px" height="80px" />
                        </div>
                        <p>Lista de licencias</p>
                        <div className=''>
                            <ListGroup>
                                {
                                    detalle.licencias?.map((obj, index) => (
                                        <Card>
                                            <Card.Body id={ index } value={obj.precio}>
                                                { obj.TipoLicencia } - { obj.descripcion }
                                            </Card.Body>
                                        </Card>
                                    ))
                                }
                            </ListGroup>
                        </div>

                        {/* 
                        <div className={`${css.divLicencias} shadow-sm `}>
                            <ListGroup>
                            {
                                productoUnoDetalle.licencias?.map((obj, indx) => (
                                    <div key={indx} onClick={(e) => handlerLicencia(e)}>
                                    <Card className={`${css.cardProducto}`}>
                                        <Card.Body id={indx} value={obj.precio}>
                                        {`${obj.TipoLicencia}  ${obj.descripcion}' `}
                                        <Button
                                            id={indx}
                                            name="boton"
                                            Style="display: none"
                                            className={`float-end btn btn-light ${css.btonLicencia} `}
                                            onClick={(e) =>
                                            handleAddToCart(productoUnoDetalle, e)
                                            }
                                            value={obj.precio}
                                        >
                                            ${obj.precio}
                                        </Button>
                                        </Card.Body>
                                    </Card>
                                    </div>
                                ))
                            }
                            </ListGroup>
                        </div>
                        */}

                        <div className='form-group input-group d-flex justify-content-center my-3'>
                            <Button className={`${style.button} text-center btn btn-primary float-end`} type='submit' variant='primary'>Editar</Button>
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default ProductoDetalle;
