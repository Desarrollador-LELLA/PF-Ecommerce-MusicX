import React, { useEffect, useState } from 'react'
import { Button, Card, Container, FloatingLabel, Form, Label, Image, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { collection, getDocs } from "firebase/firestore"; 
import { allAuth, allDb, auth, db } from "../../firebaseInicial/firebase";
import { listado_producto_by_admin } from '../../redux/actions/productoAction';
import style from '../../css/ProductoLista.module.css';


const ProductoLista = () => {
    const navegar = useNavigate()

    const [producto, setProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
        key: "",
        tiempo: 0,
        imagen: ""
    });

    const [listado, setListado] = useState([]);

    const lista = async () => {
        let ayuda = await listado_producto_by_admin();
        setListado(ayuda);
    }

    /*      Carga por primera vez la lista        */
    useEffect( () => {
        lista();
    }, []);

    return (
        <div>
            <Container className='my-3'>
                <Button onClick={() => navegar('/producto_create')}>Crear</Button>
                <Button onClick={() => navegar(-1)}>Volver</Button>
                <Card className=''>
                    <table className='table'>
                        <thead className='thead-dark'>
                            <tr className={ `${ style.tr } ` }>
                                <td className='text-center'>Nombre</td>
                                <td className='text-center'>Descripcion</td>
                                <td className='text-center'>Precio</td>
                                <td className='text-center'>Key</td>
                                <td className='text-center'>Tiempo</td>
                                <td className='text-center'>Habilitado</td>
                                <td className='text-center'>Imagen</td>
                                <td colSpan="2" className={ `${ style.td_centrado }` }>Acciones</td>
                            </tr>
                        </thead>
                        {
                            listado?.map( (e) => 
                                (
                                    <tr className={ `${ style.tr_sombreado }` }>
                                        <td>{ e.data().nombre }</td>
                                        <td>{ e.data().descripcion }</td>
                                        <td>{ e.data().precio }</td>
                                        <td>{ e.data().key }</td>
                                        <td>{ e.data().tiempo }</td>
                                        <td>
                                            { e.data().habilitado ? "Si" : "No" }
                                        </td>
                                        <td>
                                            <img className={ `${ style.imagen }` } src={ e.data().imagen } alt='' />
                                        </td>
                                        <td>
                                            <Link to={`/producto_detalle/${ e._document.key.path.segments[6] }`}>
                                                <Button className='btn btn-success'>Editar</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link>
                                                <Button className='btn btn-danger'>Eliminar</Button>
                                            </Link>
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
