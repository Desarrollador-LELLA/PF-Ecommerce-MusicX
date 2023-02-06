import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, FloatingLabel, Form, Container, Pagination, Spinner, Row, Col, Card, Badge, InputGroup } from 'react-bootstrap';
import { clear } from '@testing-library/user-event/dist/clear';
import { setLogLevel } from 'firebase/app';
import s from "../../css/genero.module.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from "react-redux";
import { paginacion } from '../../utils/libreria';
import { actualizaDocumentoArray, mostrarImgen, unDocumento, obtienePaginado, siguientePaginado, anteriorPaginado, cambiaPaginado, crearDocumento, unDocumentoCallback, actualizaDocumento } from '../../utils/metodosFirebase';
import icGenero from "../images/ic_genero.svg"
import { arrayUnion } from "firebase/firestore";


const INITIAL_PAGINADO = {
  id: "docGenero",
  coleccion: 'generos',
  ordenarPor: 'nombre',
  whereFiltros: null,
  lista: [],
  itemPorPagina: 6,
  paginaActual: 1,
};

const Generos = () => {
  const [estadoInicial, setEstadoInicial] = useState(INITIAL_PAGINADO);
  const [loading, setLoading] = useState(false);
  const { cantPaginas, fin, inicio, paginasBar } = paginacion(estadoInicial.lista.length, estadoInicial.paginaActual, estadoInicial.itemPorPagina);

  const [error, setError] = useState(null);
  const [errorr, setErrorr] = useState(null);
  const [abrirModalCrear, setAbrirModalCrear] = useState(false);
  const [nombreCrear, setNombreCrear] = useState("");
  const [idCrear, setIdCrear] = useState("");
  const [habilitado, setHabilitado] = useState(true);
  const [buscarGenero, setBuscarGenero] = useState("");
  const [listaMostrar, setListaMostrar] = useState([]);
  const dispatch = useDispatch();
  const [abrirModalEditar, setAbrirModalEditar] = useState(false);
  const [generoEditar, setGeneroEditar] = useState({});

  useEffect(() => {
    llenarLista();
  }, []);

  const llenarLista = async () => {
    setLoading(true);
    await unDocumentoCallback(estadoInicial.coleccion, estadoInicial.id, (retorno) => {
      setEstadoInicial({ ...estadoInicial, lista: retorno.result.generos });
      setLoading(false)
    });
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

  //MODAL CREAR GENERO
  const handleAbrirModalCrear = () => setAbrirModalCrear(true);

  const handleCloseAbrirModalCrear = () => {
    setNombreCrear("");
    setError(null);
    setAbrirModalCrear(false);
    setIdCrear("")
  };

  function handleOnChangeNombreCrear(e) {
    setNombreCrear(e.target.value);
  }
  async function handleCrearGenero(e) {
    if (validate()) {
      const siExisteId = estadoInicial.lista.find(x => x.id === idCrear)
      if (siExisteId) {
        alert("si existe");
      }
      else {
        const resultado = await actualizaDocumentoArray(estadoInicial.coleccion, estadoInicial.id, { data: { generos: arrayUnion({ id: idCrear, nombre: nombreCrear, habilitado: true }) } })

        if (resultado.confirma) {
          setNombreCrear("");
          setIdCrear("");
          setAbrirModalCrear(false);
          llenarLista();

        }

      }
    }

  }

  function handleOnChangeIdCrear(e) {
    setIdCrear(e.target.value);
  }



  //MODAL EDITAR GENERO
  const confirmarEdicion = async () => {
    if (generoEditar.id==null) return alert ("ingrese un id valido mayor a 0")
    if (generoEditar.nombre== "") return alert ("ingrese un nombre valido")
    const listaNueva = estadoInicial.lista.filter((x,i)=>i !== generoEditar.index)
    if (listaNueva.find(x => x.id === generoEditar.id)) {
      alert("el id ya existe")
    } else {
      listaNueva.push({ id: generoEditar.id, nombre: generoEditar.nombre, habilitado: generoEditar.habilitado })
      const resultado = await actualizaDocumentoArray(estadoInicial.coleccion, estadoInicial.id, { data: { generos: listaNueva } })
      if (resultado.confirma) {
        setGeneroEditar({});
        // setError(null);
        setAbrirModalEditar(false);
        llenarLista();

      }

    }
  }
  const habilarADesabilitar = () => {
    setGeneroEditar({ ...generoEditar, habilitado: !generoEditar.habilitado })
  }
  const handleClose2 = () => {
    setNombreCrear("");
    setError(null);
    setAbrirModalEditar(false);
  };

  function handleOnChangeNombreEditar(e) {
    setGeneroEditar({ ...generoEditar, nombre: e.target.value });

  }
  function handleOnChangeIdEditar(e) {
    setGeneroEditar({ ...generoEditar, id: e.target.value });

  }


  //FORMULARIO EN GENERAL
  function handleSort(e) {
    e.preventDefault();
  };

  const handleShow2 = async (idIndex) => {
    const objetoGenero = await unDocumento(estadoInicial.coleccion, estadoInicial.id);

    if (objetoGenero.confirma) {
      setGeneroEditar({ ...objetoGenero.result.generos[idIndex], index: idIndex });
      setAbrirModalEditar(true);
    }
  };
  //BUSCAR
  const filterProducts = ({ opDesc, opAsce, opAZ, opZA, opSinOrden, search, generos, keyF }, lista) => {

    let nuevaLista = lista.slice();

    if (search) {
      nuevaLista = nuevaLista.filter((ele) => {
        return ele.nombre.toLowerCase().includes(search.toLowerCase()) || ele.autor.toLowerCase().includes(search.toLowerCase()) || ele.descripcion.toLowerCase().includes(search.toLowerCase())
      }
      );
    }
    return nuevaLista;
  };

  function buscar(e) {
    setBuscarGenero(e.target.value);
  }

  const onClickBuscar = () => {
    if (validar()) {
      // setListaMostrar(lista.filter(x => x === buscarGenero))
    }
  };


  const validate = () => {
    if (nombreCrear === "") {
      setError("Debe completar el campo");
      return false;
    }

    if (nombreCrear.length < 3 || nombreCrear.length >= 20) {
      setError("El nombre debe contener entre 3 y 20 caracteres");
      setNombreCrear("");
      return false;
    }
    return true;
  };

  const validar = () => {
    if (listaMostrar === "") {
      setErrorr("Debe completar el campo");
      return false;

    }

    if (listaMostrar.length < 3 || listaMostrar.length >= 20) {
      setErrorr("El nombre debe contener entre 3 y 20 caracteres");
      return false;
    }

    if (
      listaMostrar != "blues" ||
      listaMostrar != "rock and roll" ||
      listaMostrar != "Pop" ||
      listaMostrar != "Hip hop/Rap" ||
      listaMostrar != "Reggaetón" ||
      listaMostrar != "rock nacional" ||
      listaMostrar != "Música clásica" ||
      listaMostrar != "salsa" ||
      listaMostrar != "Disco" ||
      listaMostrar != "Reggae" ||
      listaMostrar != "Funk" ||
      listaMostrar != "Techno" ||
      listaMostrar.length < 1
    ) {
      setErrorr("Debe completar el campo");
      return false;
    }

    return true;
  };

  return (
    <Container>
      {/* MODAL CREAR GENERO */}
      <Modal show={abrirModalCrear} onHide={handleCloseAbrirModalCrear} backdrop="static" keyboard={false}>
        <Modal.Header className="bg-dark" closeButton>
          <Modal.Title className="text-bg-dark p-1" >Crear genero</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-bg-dark" >
          <FloatingLabel controlId="floatingInput" label="id " className="text-dark" >
            <Form.Control type="number" placeholder="1-1000" onChange={handleOnChangeIdCrear} value={idCrear} />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Genero " className="text-dark" >
            <Form.Control type="text" placeholder="rock an roll" onChange={handleOnChangeNombreCrear} value={nombreCrear} />
          </FloatingLabel>

        </Modal.Body>
        <Modal.Footer className="bg-dark">
          {
            error ?
              <div class="alert alert-danger" role="alert">{error}</div>
              : null
          }
          <Button variant="secondary" onClick={handleCloseAbrirModalCrear}>Close</Button>
          <Button variant="primary" onClick={handleCrearGenero}>Crear</Button>
        </Modal.Footer>
      </Modal>
      {/* MODAL EDITAR GENERO */}
      <Modal show={abrirModalEditar} onHide={handleClose2} backdrop="static" keyboard={false}>
        <Modal.Header closeButton className="bg-dark">
          <Modal.Title className="text-bg-dark p-3">Editar Genero</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="text-dark p-1">
          <FloatingLabel controlId="floatingInput"  label="id " className="text-dark" >
            <Form.Control type="number" placeholder="1-1000" onChange={handleOnChangeIdEditar} value={generoEditar.id} />
          </FloatingLabel>

          <FloatingLabel controlId="floatingInput" label="Genero" className="text-dark-bg-dark" >
            <Form.Control type="text" placeholder="rock an roll" onChange={handleOnChangeNombreEditar} value={generoEditar.nombre} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" className={generoEditar.habilitado ? "btn btn-success" : "btn btn-danger"} onClick={habilarADesabilitar}>{generoEditar.habilitado ? "habilitado" : "desahabilitado"}</button>
          </div>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button className="primary" onClick={confirmarEdicion}>Editar</Button>
        </Modal.Footer>
      </Modal>
      {/* TITULO DEL FORMULARIO */}
      <div className={s.contendor}>
        <p className={s.topbeats}>
          <span data-text="G">G</span>
          <span data-text="E">E</span>
          <span data-text="N">N</span>
          <span data-text="E">E</span>
          <span data-text="R">R</span>
          <span data-text="O">O</span>
          <span data-text="S">S</span>
          <span data-text="!">!</span>
        </p>

      </div>
      {/* BUSCADOR DE GENEROS */}
      <div className='container-fluid'>
        <InputGroup className="mb-3 w-50">
          <Form.Control
            placeholder="Buscar..."
            aria-label="Buscar"
            aria-describedby="basic-addon2"
            onChange={(e) => buscar(e)}
          />

          <Button variant="outline-secondary" type="submit" onClick={(e) => onClickBuscar(e)}>
            Buscar Genero
          </Button>

          <Button variant="outline-secondary" onClick={handleAbrirModalCrear} >
            Crear Genero
          </Button>

        </InputGroup>
        {
          errorr ?
            <div class="alert alert-danger" role="alert">
              {errorr}
            </div>
            : null
        }

        {/* LISTADO DE GENEROS MAP */}
        <Row xs={2} sm={3} md={3} lg={4} xl={5} xxl={6}>
          {
            loading ? <Spinner animation="border" variant="light" /> :
              estadoInicial.lista.length ?
                estadoInicial.lista.slice(inicio, fin).map(i => (
                  <Col className='my-2'>
                    <Card className={`${s.card_genero} h-100`} onClick={e => { " handleClick(e)"; }}>
                      <Card.Img className={`${s.img_genero} rounded-circle`} src={icGenero} variant="top" />
                      <Card.Body className='d-grid'>
                        <Card.Title className='text-light'>
                          {i.nombre}
                        </Card.Title>
                        <Button variant="outline-secondary mb-3" onClick={() => handleShow2(estadoInicial.lista.findIndex(x => x.id === i.id))}>Editar</Button>
                        <Badge bg={i.habilitado ? "success" : "danger"}>
                          {i.habilitado ? "Habilitado" : "Deshabilitado"}
                        </Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                )) : null  //ACA SE DEBE MOSTRAR AL USUARIO QUE NO EXISTEN GENEROS EN CASO DE BUSQUEDA O AL INICIAR
          }
        </Row>
      </div>

      <Pagination className='justify-content-center' >
        <Pagination.Prev onClick={anterior} className={s.paginado_genero} />
        <Pagination.Item className={s.paginado_genero} onClick={cambiarPagina} active={paginasBar[0] === estadoInicial.paginaActual ? true : false}>{paginasBar[0]} </Pagination.Item >
        {paginasBar[1] && <Pagination.Ellipsis className={s.paginado_genero} />}

        {paginasBar[2] && <Pagination.Item onClick={cambiarPagina} className={s.paginado_genero} active={paginasBar[2] === estadoInicial.paginaActual ? true : false}>{paginasBar[2]}</Pagination.Item>}
        {paginasBar[3] && <Pagination.Item onClick={cambiarPagina} className={s.paginado_genero} active={paginasBar[3] === estadoInicial.paginaActual ? true : false}>{paginasBar[3]}</Pagination.Item>}
        {paginasBar[4] && <Pagination.Item onClick={cambiarPagina} className={s.paginado_genero} active={paginasBar[4] === estadoInicial.paginaActual ? true : false}>{paginasBar[4]}</Pagination.Item>}

        {paginasBar[5] && <Pagination.Ellipsis className={s.paginado_genero} />}
        {paginasBar[6] && <Pagination.Item onClick={cambiarPagina} className={s.paginado_genero} active={paginasBar[6] === estadoInicial.paginaActual ? true : false}>{paginasBar[6]}</Pagination.Item>}
        {<Pagination.Next onClick={siguiente} className={s.paginado_genero} />}
      </Pagination>
    </Container>
  );
};

export default Generos;