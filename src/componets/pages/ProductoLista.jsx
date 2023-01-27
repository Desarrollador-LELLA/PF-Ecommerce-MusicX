import React, { useEffect, useState } from 'react'
import { Button, Card, Container, FloatingLabel, Form, Label, Image, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { collection, getDocs, doc, updateDoc } from "firebase/firestore"; 
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

    const navigate = useNavigate();
    let [ultimo, setUltimo] = useState(1);

    const handleHabilitar = async (id, valor) => {
        try
        {
            console.log("ACTUAL", id, valor);
            const docRef = doc(db, "productos", id);
            await updateDoc(docRef, {
                habilitado: !valor
            });
            setUltimo(ultimo = ultimo + 1);
        }
        catch(err)
        {
            console.log("Error generado : ", err);
        }
    }
    

    /*      Carga por primera vez la lista        */
    useEffect( () => {
        lista();
    }, [ultimo]);


    return (
        <div>
            <Container className='my-3'>
                <Button className='mr-1' onClick={() => navegar('/producto_create')}>Crear</Button>
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
                                                <Button className='btn btn-primary'>Editar</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            {/*
                                                e.data().habilitado ?           //      Yo hago clic en el boton pero cambia todos los valores de la columna,ESO SOMBREADO ES EL ID, NO

                                                (
                                                    <Button className='btn btn-danger' id={ e.id } onClick={ handleHabilitar(e.id, !e.data().habilitado) }>Deshabilitar</Button>
                                                )
                                                :
                                                (
                                                    <Button className='btn btn-warning' id={ e.id } onClick={ handleHabilitar(e.id, !e.data().habilitado) }>Habilitar</Button>
                                                )
                                            */}
                                            <Link>
                                                <Button id={ e.id } variant= { e.data().habilitado ? 'danger' : 'warning' } onClick={ x => handleHabilitar(e.id, e.data().habilitado) }>
                                                    { e.data().habilitado ? "Deshabilitar" : "Habilitar" }
                                                </Button>
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
