import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Form, ListGroup, Modal, ModalBody, ModalHeader, ModalFooter, InputGroup  } from 'react-bootstrap';
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



    /*      Eliminacion de licdencias       */
    const tipoLicencias = [
        {
          nombre: "Licencia Tipo 1",
          descripcion: "Esta licencia entregará al usuario un archivo .mp3",
        },
        {
          nombre: "Licencia Tipo 2",
          descripcion: "Esta licencia entregará al usuario un archivo .wav",
        },
    
        {
          nombre: "Licencia Tipo 3",
          descripcion:
            "Esta licencia entregará al usuario un archivo .zip o .rar descomprimible que contendrá la pista dividida en canales por stems",
        },
        {
          nombre: "Licencia Tipo 4",
          descripcion:
            "Esta licencia te permitirá obtener todas las credenciales y derechos sobre el beat con todos sus niveles de archivo",
        },
    ];

    
    const [archivo, setArchivo] = useState([]);
    const [EstadoTipoLi, setEstadoTipoLi] = useState(tipoLicencias);
    const [licencia, setLicencia] = useState({});
    const [LicenCreadas, setLicenCreadas] = useState([]);
    const [popUp, setPopUp] = useState({
        state: false,
    });

    const handlePopUp = () => {
        setPopUp({
          state: !popUp.state,
        });
    };
    
    const handlerEliminar = (e) => {

        const copia_licencia =  detalle.licencias.slice();
        copia_licencia.splice(e, 1);
        setDetalle({ ...detalle, licencias: copia_licencia });


        /*
        const eliArchivo = archivo.filter(
            (obj, i) => i !== parseInt(e.target.value)
        );
        console.log(archivo);

        setArchivo(eliArchivo);
    
        const filtrado = LicenCreadas.filter((licen) =>
        {
            return licen.TipoLicencia !== e.target.id;
        });
        setLicenCreadas(filtrado);
    
        switch (e.target.id) {
            case tipoLicencias[0].nombre:
                return setEstadoTipoLi([tipoLicencias[0], ...EstadoTipoLi]);
            case tipoLicencias[1].nombre:
                return setEstadoTipoLi([tipoLicencias[1], ...EstadoTipoLi]);
            case tipoLicencias[2].nombre:
                return setEstadoTipoLi([tipoLicencias[2], ...EstadoTipoLi]);
            case tipoLicencias[3].nombre:
                return setEstadoTipoLi([tipoLicencias[3], ...EstadoTipoLi]);
            default:
            {
                return;
            }
        }
        */
    };


    //  Metodoss de Licencias en la ventana popup
    function validar() {
        const lista = document.getElementById("ListaTipo");
        const agregarArchivo = document.getElementById("AgregarArchivo");
        const precio = document.getElementById("Precio");
        const AgregarLicencia = document.getElementById("AgregarLicencia");
        const selector = document.getElementById("opSelector");
        AgregarLicencia.disabled = true;
        let aux = false;
        if (lista.value !== "Seleccionar")
        {
          agregarArchivo.disabled = false;
          selector?.remove();
        }
    
        if (!agregarArchivo.value)
        {
          AgregarLicencia.disabled = true;
        }
        else if (!precio.value)
        {
          AgregarLicencia.disabled = true;
        }
        else
        {
          AgregarLicencia.disabled = false;
          aux = true;
        }
        return aux;
    }


    const handlerLicencia = (e) => {
        validar();
        const { name, value } = e.target;
        setLicencia({
            ...licencia,
            [name]: value,
        });

        if (e.target.id === "ListaTipo") {
            const parrafo = document.getElementById("ParrafoDescripcion");
            tipoLicencias.forEach((element) => {
                if (element.nombre === e.target.value) {
                console.log("LINEA 173");
                parrafo.innerHTML = element.descripcion;
                }
            });
        }
    };
    
      const handlerAgregarLicen = (e) => {
        if (!validar()) return alert("llene los campos");
        const filtradoTipoLicencia = EstadoTipoLi.filter((licen) => {
            return licen.nombre !== licencia.TipoLicencia;
        });

        setEstadoTipoLi(filtradoTipoLicencia);
        setLicenCreadas([
          ...LicenCreadas,
          {
            ...licencia,
            descripcion: document.getElementById("ParrafoDescripcion").innerHTML,
          },
        ]);
        setLicencia({});
        handlePopUp();
    };

    const handlerSbubirArchivo = async (e) => {
        await setArchivo([...archivo, e.target.files[0]]);
        validar();
    };

    
    return (
        <div>
            <Container className='my-3'>
                <Card className={ `${ style.detalleProducto } m-auto` } >
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
                            <Form.Select name="key" className={`${style.selectbox}`} value={ detalle.key } >
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
                            <Form.Control className={`${style.filebox}`} type="file" accept="image/png, image/jpg, image/jpeg" onChange={ handleSubirImagen } />
                            <br />
                            <Form.Control.Feedback type={"invalid"}>
                                {errores.imagen}
                            </Form.Control.Feedback>
                        </div>
                        <div className='form-group input-group input-group-text my-3 d-flex justify-content-between'>
                            <img src={detalle?.imagen} alt='' width="80px" height="80px" />
                        </div>

                        <div>
                            <Button className={`btn btn-secondary`} onClick={ handlePopUp } >
                                Agregar Licencia
                            </Button>
                            {/* 
                            <div className={`${style.divLicenciasCrear} shadow-sm `}>
                                <ListGroup>
                                {LicenCreadas?.map((obj, indx) => (
                                    <div key={indx}>
                                    <Card className={`${style.cardProductoCrear}`}>
                                        <Card.Body id={indx}>
                                        <h4>{obj.TipoLicencia}</h4>
                                        {`Descripcion: ${obj.descripcion} Valor: ${obj.precio}`}
                                        <Button
                                            name="boton"
                                            className="float-end btn btn-primary"
                                            id={obj.TipoLicencia}
                                            onClick={handlerEliminar}
                                            value={indx}
                                        >
                                            X
                                        </Button>
                                        </Card.Body>
                                    </Card>
                                    </div>
                                ))}
                                </ListGroup>
                            </div>
                            */}
                        </div>

                        <div className=''>
                            <ListGroup>
                                {
                                    detalle.licencias?.map((obj, index) => (
                                        <Card key={ index } >
                                            <Card.Body value={obj.precio}>
                                                { obj.TipoLicencia } - { obj.descripcion }
                                                <Button name="boton" className="float-end btn btn-primary" onClick={ () => handlerEliminar(index) } >
                                                    X
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    ))
                                }
                            </ListGroup>
                        </div>

                        <div className='form-group input-group d-flex justify-content-center my-3'>
                            <Button className={`${style.button} text-center btn btn-primary float-end`} type='submit' variant='primary'>
                                Editar
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>

            <Modal show={popUp.state}>
                <ModalHeader>Incerta las Licencias</ModalHeader>
                <ModalBody>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo Licencia</Form.Label>
                        <Form.Select id="ListaTipo" name="TipoLicencia" onChange={ handlerLicencia } >
                            <option id="opSelector">Seleccionar</option>
                            {
                                EstadoTipoLi?.map((licen, i) => (
                                    <option key={i}>{licen.nombre}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Sube el archivo para tu licencia</Form.Label>
                        <Form.Control id="AgregarArchivo" onChange={ handlerSbubirArchivo } name="archivo" type="file" size="sm" disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Precio Licencia</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                            id="Precio"
                            onChange={ handlerLicencia }
                            name="precio"
                            aria-label="Amount (to the nearest dollar)"
                            type="number"
                            />
                            <InputGroup.Text>Col</InputGroup.Text>
                        </InputGroup>
                        <Form.Label>
                            <p id="ParrafoDescripcion"></p>
                        </Form.Label>
                    </Form.Group>
                    <div className="form-group input-group   d-flex justify-content-center">
                    <Button id="AgregarLicencia" variant="primary" type="button" onClick={ handlerAgregarLicen } >
                        Agregar Licencia
                    </Button>
                    <Button variant="primary" type="button" onClick={handlePopUp}>
                        Cerrar
                    </Button>
                    </div>
                </Form>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>

        </div>
    );
};

export default ProductoDetalle;


const object = {
    "licencias": [
        {
            "precio": "500",
            "descripcion": "Esta licencia entregará al usuario un archivo .wav",
            "url": "https://firebasestorage.googleapis.com/v0/b/orion-proyect.appspot.com/o/productos%2F2NHPtswsVuL0aywYpk46%2FLicencia%20Tipo%202.?alt=media&token=4c7d14a8-8d04-48ae-b4ec-cffeada257fd",
            "TipoLicencia": "Licencia Tipo 2"
        }
    ],
    "nombre": "PruebaMaxima7",
    "descripcion": "PruebaMaxima7",
    "tiempo": "160",
    "genero": [
        "Pop",
        "Hip-Hop"
    ],
    "audio": "https://firebasestorage.googleapis.com/v0/b/orion-proyect.appspot.com/o/productos%2F2NHPtswsVuL0aywYpk46%2Faudio.mpeg?alt=media&token=45c6e78b-d126-4890-915b-184619f2ea2c",
    "autor": "Roanaldo",
    "key": "E min",
    "imagen": "https://firebasestorage.googleapis.com/v0/b/orion-proyect.appspot.com/o/productos%2F2NHPtswsVuL0aywYpk46%2Fbeat.png?alt=media&token=48d655ff-c0b5-4b68-95d5-8a5d6500aabf"
}



