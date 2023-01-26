import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Modal, FloatingLabel, Form } from 'react-bootstrap';
import { clear } from '@testing-library/user-event/dist/clear';
import { setLogLevel } from 'firebase/app';
import s from "../../css/Home.module.css";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {useDispatch} from "react-redux"





const lista = ["blues", "rock and roll", "Pop", "Hip hop/Rap", "Reggaetón", "rock nacional", "Música clásica", "salsa", "Disco", "Reggae", "Funk", "Techno"]




const Generos = () => {
  const [ButtonGroup] = useState (null)
  const [error, setError] = useState(null)
  const [errorr, setErrorr] = useState(null)
  const [show, setShow] = useState(false);
  const [nombre, setNombre] = useState("");
  const [buscarGenero, setBuscarGenero] = useState("");
  const [listaMostrar, setListaMostrar] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    setListaMostrar(lista)
  }, [])



  const handleClose = () => {
    setNombre("")
    setError(null)
    setShow(false)


  };
  const handleShow = () => setShow(true);
  function handleSort(e) {
    e.preventDefault();
  };

  function handleChangee(e) {
    setNombre(e.target.value)
  }

  function handleClick(e) {
    e.preventDefault();

  };

  function handleVolver(e){
    e.preventDefault();
    dispatch(lista [e]);
};

  // function handleInputChange(e) {
  //   e.preventDefault();
  // };

  function handleSubmit(e) {
    e.preventDefault();
  };

  function buscar(e) {
    setBuscarGenero(e.target.value)



  }
  const onClickBuscar = () => {
    if (validar()) {
      setListaMostrar(lista.filter(x => x === buscarGenero))
      // setShow(false)
      // setListaMostrar("")

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
      // setNombre("")

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
          <Modal.Title>Crear genero</Modal.Title>
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
        {/* <h1 className="topbeats"></h1> */}
        <div>
          <input className="text-bg-dark p-3"
            type='text'
            placeholder  ="Buscar..." 
            onChange={(e) => buscar(e)} 
          />

          <button type="submit"className="text-bg-secondary p-3" onClick={(e) => onClickBuscar(e)}>Buscar</button>
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
            {/* <option value='eu'>Europeos</option> */}
          </select>
        </div>
        <div className='row row-cols-6'>
          {
            listaMostrar.map(i => (
              <div className='col'>
                <div className='card' onClick={e => { handleClick(e) }}>
                  <div className="text-bg-dark p-3">
                    <h3 className='card-title'>{i}</h3>
                    {/* <div><Button variant="outline-success">Editar</Button>{' '}</div> */}
                    <div> <Dropdown className='boton-editar'>
      <Dropdown.Toggle className="text-bg-dark p-3" id="dropdown-basic">
        Editar
      </Dropdown.Toggle >

      <Dropdown.Menu className="text-bg-dark p-3">
      <Button variant="primary">Nombre</Button>{' '}
      <Button variant="success">Hbilitar</Button>{' '}
      <Button variant="danger">Deshabilitar</Button>{' '}



        {/* <Dropdown.Item href="#/action-1">Nombre</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Habilitar</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Desabilitar</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown></div>
                  </div>

                </div>
              </div>

            ))
          }
        </div>
      </div>
      <div> <Button variant="outline-secondary"  onClick={e=> {handleVolver(e)}}>Volver a cargar todos los generos</Button>{' '}</div>
      {/* <div> <Button variant="outline-primary">Editar generos</Button>{' '}</div> */}

      {/* <div className="lista-generos">
        <Link to='/create' className="btn btn-primary float-md-none">crear Genero</Link>
      </div> */}
      {/* </div> */}
      </div>
    </>


  );
};

export default Generos;