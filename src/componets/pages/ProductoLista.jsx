import React, { useEffect, useState } from 'react'
import { Button, Card, Container, FloatingLabel, Form, Label, Image, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { collection, getDocs } from "firebase/firestore"; 
import { allAuth, allDb, auth, db } from "../../firebaseInicial/firebase";
import { prueba_final } from '../../redux/actions/productoAction';
import style from '../../css/ProductoLista.module.css';


const ProductoLista = () => {

    const [producto, setProducto] = useState({
        nombre: "",
        descripcion: "",
        key: "",
        tiempo: 0,
        imagen: ""
    });

    const [listado, setListado] = useState([]);

    const lista = async () => {
        let ayuda = await prueba_final();
        setListado(ayuda);
    }

    /*      Carga por primera vez la lista        */
    useEffect( () => {
        lista();
    }, []);

    return (
        <div>
            <Container className='my-3'>
                <Card className=''>
                    <table>
                        <tr className={ `${ style.tr }` }>
                            <td>Nombre</td>
                            <td>Descripcion</td>
                            <td>Key</td>
                            <td>Tiempo</td>
                            <td>Imagen</td>
                            <td colSpan="2" className={ `${ style.td_centrdo }` }>Acciones</td>
                        </tr>
                        {
                            listado?.map( (e) => 
                                (
                                    <tr>
                                        <td>{ e.data().nombre }</td>
                                        <td>{ e.data().descripcion }</td>
                                        <td>{ e.data().key }</td>
                                        <td>{ e.data().tiempo }</td>
                                        <td>
                                            <img className={ `${ style.imagen }` } src={ e.data().imagen } alt='' />
                                        </td>
                                        <td>
                                            <Link to={`/producto_detalle/${ e.data().id }`}>
                                                <button className={ `${ style.boton }` }>Editar</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className={ `${ style.boton }` }>Eliminar</button>
                                        </td>
                                    </tr>                                    
                                )
                            )
                        }


                    </table>
                </Card>
            </Container>
        </div>
    )
}

export default ProductoLista;
