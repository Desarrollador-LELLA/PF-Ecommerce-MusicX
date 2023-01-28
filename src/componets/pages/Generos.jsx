import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, FloatingLabel, Form, Container, Pagination, Spinner } from 'react-bootstrap';
import { clear } from '@testing-library/user-event/dist/clear';
import { setLogLevel } from 'firebase/app';
import s from "../../css/Home.module.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from "react-redux";
import { paginacion } from '../../utils/libreria';
import { todosDocumentos, mostrarImgen, obtienePaginado, siguientePaginado, anteriorPaginado, cambiaPaginado, crearDocumento, unDocumento, actualizaDocumento } from '../../utils/metodosFirebase';

const INITIAL_PAGINADO = {
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
    const list = await todosDocumentos(estadoInicial.coleccion, estadoInicial.ordenarPor, estadoInicial.whereFiltros, () => {
      setLoading(false);
    });
    console.log(list);
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

  //MODAL CREAR GENERO
  const handleAbrirModalCrear = () => setAbrirModalCrear(true);

  const handleCloseAbrirModalCrear = () => {
    setNombreCrear("");
    setError(null);
    setAbrirModalCrear(false);
  };

  function handleOnChangeNombreCrear(e) {
    setNombreCrear(e.target.value);
  }
  async function handleCrearGenero(e) {
    const resultado = await crearDocumento(estadoInicial.coleccion, { data: { nombre: nombreCrear, habilitado } });
    if (validate()) {
      setAbrirModalCrear(false);
      setNombreCrear("");

      if (resultado.confirma) {
        llenarLista();
        setAbrirModalCrear(false);
        setNombreCrear("");
      }
    }
  }


  //MODAL EDITAR GENERO
const confirmarEdicion = async () => {
  const resultado =await actualizaDocumento (estadoInicial.coleccion,generoEditar.id,{data:{nombre:generoEditar.nombre, habilitado:generoEditar.habilitado}} )
  if(resultado.confirma){
    setGeneroEditar({});
    // setError(null);
    setAbrirModalEditar(false);
    llenarLista();

  }
}
  const habilarADesabilitar = () =>{
    setGeneroEditar({...generoEditar, habilitado:!generoEditar.habilitado})
  }
const handleClose2 = () => {
  setNombreCrear("");
    setError(null);
    setAbrirModalEditar(false);
  };

  function handleOnChangeNombreEditar(e) {
    setGeneroEditar({ ...generoEditar, nombre: e.target.value });

  }

  //FORMULARIO EN GENERAL
  function handleSort(e) {
    e.preventDefault();
  };

  const handleShow2 = async (edidatId) => {
    console.log(edidatId);
    const objetoGenero = await unDocumento(estadoInicial.coleccion, edidatId);
    if (objetoGenero.confirma) {
      setGeneroEditar(objetoGenero.result);
      setAbrirModalEditar(true);
    }
  };

  function handleSort(e) {
    e.preventDefault();
  };


  function handleVolver(e) {
    e.preventDefault();
    // dispatch(lista[e]);
  };

  function buscar(e) {
    setBuscarGenero(e.target.value);
  }

  const onClickBuscar = () => {
    if (validar()) {
      // setListaMostrar(lista.filter(x => x === buscarGenero))
    }
  };

  const handleCreate = () => {
    if (validate()) {
      // lista.push(nombre)
      setAbrirModalCrear(false);
      setNombreCrear("");
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
      <Button variant="outline-secondary" onClick={handleAbrirModalCrear}>Crear genero musical</Button>
      <Modal show={abrirModalCrear} onHide={handleCloseAbrirModalCrear} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="text-bg-dark p-3" >Crear genero</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="Genero" className="mb-3" >
            <Form.Control type="text" placeholder="rock an roll" onChange={handleOnChangeNombreCrear} value={nombreCrear} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
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
        <Modal.Header closeButton>
          <Modal.Title className="text-bg-dark p-3">Editar Genero</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="text-dark p-3">
          <FloatingLabel controlId="floatingInput" label="Genero" className="mb-3" >
            <Form.Control type="text" placeholder="rock an roll" onChange={handleOnChangeNombreEditar} value={generoEditar.nombre} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" className={generoEditar.habilitado ? "btn btn-success":"btn btn-danger"} onClick= {habilarADesabilitar}>{generoEditar.habilitado ? "habilitado":"desahabilitado"}</button>
          </div>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button className="primary" onClick={ confirmarEdicion}>Editar</Button>
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
        <div>
          <input className="text-bg-dark p-3" type='text' placeholder="Buscar..." onChange={(e) => buscar(e)} />
          <button type="submit" className="text-bg-secondary p-3" onClick={(e) => onClickBuscar(e)}>Buscar</button>
          {
            errorr ?
              <div class="alert alert-danger" role="alert">
                {errorr}
              </div>
              : null
          }
        </div>
        {/* FILTRO DE GENEROS */}
        <div>
          <select className="text-bg-dark p-3" onChange={e => handleSort(e)}>
            <option value='art'>Artistas</option>
            <option value='lat'>Latinos</option>
            <option value='int'>Internacionales</option>
            <option value='eu'>Nombre</option>
          </select>
        </div>
        {/* LISTADO DE GENEROS MAP */}
        <div className='row row-cols-6'>
          {
            loading ? <Spinner animation="border" variant="light" /> :
              estadoInicial.lista.length ?
                estadoInicial.lista.slice(inicio, fin).map(i => (
                  <div className='col'>
                    <div className='card' onClick={e => { " handleClick(e)"; }}>
                      <div className="text-bg-dark p-3">
                        <h3 className='card-title'>{i.nombre}</h3>
                        <Button variant="outline-secondary" onClick={() => handleShow2(i.id)}>Editar</Button>
                      </div>
                    </div>
                  </div>
                )) : null  //ACA SE DEVE MOSTRAR AL USUARIO QUE NO EXISTEN GENEROS EN CASO DE BUSQUEDA O AL INICIAR
          }
        </div>
      </div>
      {/* PAGINADO */}
      <div> <Button variant="outline-secondary" onClick={e => { handleVolver(e); }}>Volver a cargar todos los generos</Button>{' '}</div>
      <Pagination>
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
  );
};

export default Generos;