import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Modal, FloatingLabel, Form } from 'react-bootstrap';
import { clear } from '@testing-library/user-event/dist/clear';
import { setLogLevel } from 'firebase/app';
import s from "../../css/Home.module.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from "react-redux"

const INITIAL_PAGINADO = {
  coleccion: 'generos',
  ordenarPor: 'nombre',
  whereFiltros: null,
  lista: [],
  itemPorPagina: 4,
  paginaActual: 1,
};




// const lista = [ "rock and roll", "Pop", "Hip hop/Rap", "Reggaetón", "rock nacional", "Música clásica", "salsa", "Disco", "Reggae", "Funk", "Techno"]




const Generos = () => {
  const [estadoInicial, setEstadoInicial] = useState(INITIAL_PAGINADO);
  const [loading, setLoading] = useState(false);
  const { cantPaginas, fin, inicio, paginasBar } = paginacion(estadoInicial.lista.length, estadoInicial.paginaActual, estadoInicial.itemPorPagina);

  const [ButtonGroup] = useState(null)
  const [error, setError] = useState(null)
  const [errorr, setErrorr] = useState(null)
  const [show, setShow] = useState(false);
  const [nombre, setNombre] = useState("");
  const [buscarGenero, setBuscarGenero] = useState("");
  const [listaMostrar, setListaMostrar] = useState([])
  const dispatch = useDispatch()
  const [show2, setShow2] = useState(false);



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



  // useEffect(() => {
  //   setListaMostrar(lista)
  // }, [])



  const handleClose = () => {
    setNombre("")
    setError(null)
    setShow(false)


  };

  const handleClose2 = () => {
    setNombre("")
    setError(null)
    setShow2(false)


  };
  const handleShow = () => setShow(true);
  function handleSort(e) {
    e.preventDefault();
  };

  const handleShow2 = () => setShow2(true);
  function handleSort(e) {
    e.preventDefault();
  };


  function handleChangee(e) {
    setNombre(e.target.value)
  }

  function handleVolver(e) {
    e.preventDefault();
    dispatch(lista[e]);
  };

  function buscar(e) {
    setBuscarGenero(e.target.value)



  }
  const onClickBuscar = () => {
    if (validar()) {
      setListaMostrar(lista.filter(x => x === buscarGenero))
    }
  }



  const handleCreate = () => {
    if (validate()) {
      lista.push(nombre)
      setShow(false)
      setNombre("")
    }
  }


  const validate = () => {
    if (nombre === "") {
      setError("Debe completar el campo")
      return false

    }

    if (nombre.length < 3 || nombre.length >= 20) {
      setError("El nombre debe contener entre 3 y 20 caracteres")
      setNombre("")

      return false
    }
    return true
  }

  const validar = () => {
    if (listaMostrar === "") {
      setErrorr("Debe completar el campo")
      return false

    }
    if (listaMostrar.length < 3 || listaMostrar.length >= 20) {
      setErrorr("El nombre debe contener entre 3 y 20 caracteres")

      return false
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
      setErrorr("Debe completar el campo")
      return false
    }

    return true
  }

  return (

    <>
      <div className={s.contendor}>

        <Button variant="outline-secondary" onClick={handleShow}>
          Crear genero musical
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-bg-dark p-3" >Crear genero</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="floatingInput" label="Genero" className="mb-3" >
              <Form.Control type="text" placeholder="rock an roll" onChange={handleChangee} value={nombre} />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            {error ?
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
              : null}

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreate}>Crear</Button>

          </Modal.Footer>
        </Modal>
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
        <div className='container-fluid'>
          <div>
            <input className="text-bg-dark p-3"
              type='text'
              placeholder="Buscar..."
              onChange={(e) => buscar(e)}
            />

            <button type="submit" className="text-bg-secondary p-3" onClick={(e) => onClickBuscar(e)}>Buscar</button>
            {errorr ?
              <div class="alert alert-danger" role="alert">
                {errorr}
              </div>
              : null}

          </div>
          <div>

            <select className="text-bg-dark p-3" onChange={e => handleSort(e)}>

              <option value='art'>Artistas</option>
              <option value='lat'>Latinos</option>
              <option value='int'>Internacionales</option>
              <option value='eu'>Nombre</option>
            </select>
          </div>
          <div className='row row-cols-6'>
            {
              listaMostrar.map(i => (
                <div className='col'>
                  <div className='card' onClick={e => { handleClick(e) }}>
                    <div className="text-bg-dark p-3">
                      <h3 className='card-title'>{i}</h3>
                      <div>
                        <>
                          <Button variant="primary" onClick={handleShow2}>
                            Editar
                          </Button>

                          <Modal
                            show={show2}
                            onHide={handleClose2}
                            backdrop="static"
                            keyboard={false}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title className="text-bg-dark p-3">Editar Genero</Modal.Title>
                            </Modal.Header>
                            <Modal.Body
                              className="text-dark p-3">
                              Nombre
                            </Modal.Body>
                            <Modal.Footer>
                              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-success">Habilitar</button>
                                <button type="button" class="btn btn-danger">Deshabilitar</button>
                              </div>
                              <Button variant="secondary" onClick={handleClose2}>
                                Close
                              </Button>
                              <Button variant="primary">Editar</Button>
                            </Modal.Footer>
                          </Modal>
                        </>

                      </div>
                    </div>

                  </div>
                </div>

              ))
            }
          </div>
        </div>
        <div> <Button variant="outline-secondary" onClick={e => { handleVolver(e) }}>Volver a cargar todos los generos</Button>{' '}</div>
      </div>
    </>


  );
};

export default Generos;