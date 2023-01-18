import React, { useState } from 'react'
import { Button, Card, Container, FloatingLabel, Form, Label, Image, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from '../../css/productoCreate.module.css';


const Producto = () => {

    const [producto, setProducto] = useState({
        nombre: "",
        imagen: "",
        descripcion: "",
        key: "",
        tiempo: 0
    });

    return (
        <div>
            <Container className='my-3'>
                <Card className=''>
                    <Table>
                        <thead className='thead-dark'>
                            <th>
                                <td>Nombre</td>
                                <td>Imagen</td>
                                <td>Descripcion</td>
                                <td>Key</td>
                                <td>Tiempo</td>
                            </th>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </Container>
        </div>
    )
}

export default Producto;
