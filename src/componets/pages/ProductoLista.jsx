import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Pagination, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { doc, updateDoc } from "firebase/firestore"; 
import { db } from "../../firebaseInicial/firebase";
import { listado_producto_by_admin } from '../../redux/actions/productoAction';
import style from '../../css/ProductoLista.module.css';
import { paginacion } from '../../utils/libreria';
import { todosDocumentos } from '../../utils/metodosFirebase';


const ProductoLista = () => {
    
    //      Codigo de paginancion

    const paginado = {
        coleccion: 'productos',
        ordenarPor: 'nombre',
        whereFiltros: null,
        lista: [],
        itemPorPagina: 4,
        paginaActual: 1,
    };

    const [estadoInicial, setEstadoInicial] = useState(paginado);
    const [loading, setLoading] = useState(false);
    const { cantPaginas, fin, inicio, paginasBar } = paginacion(estadoInicial.lista.length, estadoInicial.paginaActual, estadoInicial.itemPorPagina);


    useEffect(() => {
        llenarLista();
    }, []);

    const llenarLista = async () => {
        setLoading(true);
        const list = await todosDocumentos(estadoInicial.coleccion, estadoInicial.ordenarPor, estadoInicial.whereFiltros, () => {
            setLoading(false);
        });
        setEstadoInicial({ ...estadoInicial, lista: list.result });
    };

    const cambiarPagina = (e) => {
        const nom = e.target.innerText;
        setEstadoInicial({ ...estadoInicial, paginaActual: parseInt(nom) });
    };

    const anterior = () => {
        if (estadoInicial.paginaActual - 1 < 1) return;
        setEstadoInicial({ ...estadoInicial, paginaActual: estadoInicial.paginaActual - 1 });
    };

    const siguiente = () => {
        if (estadoInicial.paginaActual + 1 > cantPaginas) return;
        setEstadoInicial({ ...estadoInicial, paginaActual: estadoInicial.paginaActual + 1 });
    };


    //  ***************************************************************************************************************



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
            llenarLista();
        }
        catch(err)
        {
            console.log("Error generado : ", err);
        }
    }


    return (
        <div>
            <Container className='my-3'>
                <Button className={ `${ style.btn_Crear }` } onClick={() => navegar('/producto_create')}>Crear</Button>
                <Button className={ `${ style.btn_Volver }` } onClick={() => navegar(-1)}>Volver</Button>
                <Card className=''>
                    <table className={ `${ style.table_listado } table` }>
                        <thead className='thead-dark'>
                            <tr className={ `${ style.tr } ` }>
                                <td className='text-center'>Nombre</td>
                                <td className='text-center'>Descripcion</td>
                                {/*
                                <td className='text-center'>Precio</td>
                                */}
                                <td className='text-center'>Key</td>
                                <td className='text-center'>Tiempo</td>
                                <td className='text-center'>Habilitado</td>
                                <td className='text-center'>Imagen</td>
                                <td colSpan="2" className={ `${ style.td_centrado }` }>Acciones</td>
                            </tr>
                        </thead>
                        {
                            loading ? <Spinner animation="border" variant="light" /> : 
                            estadoInicial.lista.length ?
                                estadoInicial.lista.slice(inicio, fin).map((e) => (                                        
                                    <tr className={ `${ style.tr_sombreado }` }>
                                        <td>{ e.nombre }</td>
                                        <td>{ e.descripcion }</td>
                                        <td>{ e.key }</td>
                                        <td>{ e.tiempo }</td>
                                        <td>
                                            { e.habilitado ? "Si" : "No" }
                                        </td>
                                        <td>
                                            <img className={ `${ style.imagen }` } src={ e.imagen } alt='' />
                                        </td>
                                        <td>
                                            
                                            <Link to={ `/producto_detalle/${ e.id }` }>
                                                <Button className='btn btn-primary'>Editar</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link>
                                                <Button id={ e.id } variant= { e.habilitado ? 'danger' : 'warning' } onClick={ x => handleHabilitar(e.id, e.habilitado) }>
                                                    { e.habilitado ? "Deshabilitar" : "Habilitar" }
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                )) : null
                        }
                    </table>
                </Card>
                <Pagination className={ `${ style.paginacion }` }>
                    <Pagination.Prev onClick={anterior} />
                    <Pagination.Item onClick={cambiarPagina} active={paginasBar[0] === estadoInicial.paginaActual ? true : false}>{paginasBar[0]}</Pagination.Item>
                    {paginasBar[1] && <Pagination.Ellipsis />}
                    {paginasBar[2] && <Pagination.Item onClick={cambiarPagina} active={paginasBar[2] === estadoInicial.paginaActual ? true : false}>{paginasBar[2]}</Pagination.Item>}
                    {paginasBar[3] && <Pagination.Item onClick={cambiarPagina} active={paginasBar[3] === estadoInicial.paginaActual ? true : false}>{paginasBar[3]}</Pagination.Item>}
                    {paginasBar[4] && <Pagination.Item onClick={cambiarPagina} active={paginasBar[4] === estadoInicial.paginaActual ? true : false}>{paginasBar[4]}</Pagination.Item>}
                    {paginasBar[5] && <Pagination.Ellipsis />}
                    {paginasBar[6] && <Pagination.Item onClick={cambiarPagina} active={paginasBar[6] === estadoInicial.paginaActual ? true : false}>{paginasBar[6]}</Pagination.Item>}
                    {<Pagination.Next onClick={siguiente} />}
                </Pagination>
            </Container>
        </div>
    )
}

export default ProductoLista;
