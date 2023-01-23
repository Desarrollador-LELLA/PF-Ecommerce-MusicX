import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Modal, FloatingLabel, Form } from 'react-bootstrap';
import { clear } from '@testing-library/user-event/dist/clear';
import { setLogLevel } from 'firebase/app';



const lista = ["blues", "rock and roll", "Pop", "Hip hop/Rap", "Reggaetón", "rock nacional", "Música clásica", "salsa", "Disco", "Reggae", "Funk", "Techno"]




const Generos = () => {
  const [error, setError] = useState(null)

  const [show, setShow] = useState(false);
  const [nombre, setNombre] = useState("");
  const [buscarGenero, setBuscarGenero] = useState("");
  const[ listaMostrar, setListaMostrar]= useState([])
  useEffect(()=>{
    setListaMostrar(lista)
  },[])



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

  function handleInputChange(e) {
    e.preventDefault();
  };

  function handleSubmit(e) {
    e.preventDefault();
  };

  function buscar (e){
      setBuscarGenero(e.target.value)

    
  
  }
  const onClickBuscar = () => {
    if (validar()){
    setListaMostrar (lista.filter(x => x=== buscarGenero))
    // if (validate()) {
    //   lista.push(nombre)
    //   setShow(false)
    //   setNombre("")
    // }
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
      setError("Debe completar el campo")
      return false

    }
    if (listaMostrar.length < 3 || listaMostrar.length >= 20) {
      setError("El nombre debe contener entre 3 y 20 caracteres")
      setNombre("")

      return false
    }
    return true
  }

  return (

    <>
      <Button variant="primary" onClick={handleShow}>
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
      <div className='container-fluid'>
        <h1 className="lista-generos">LISTA DE GENEROS</h1>
        <div>
          <input
            type='text'
            placeholder="Buscar..."
            onChange={(e) => buscar(e)}
          />
          <button type="submit" onClick={(e) => onClickBuscar(e)}>Buscar</button>
        </div>
        <div>

          <select onChange={e => handleSort(e)}>

            <option value='art'>Artistas</option>
            <option value='su'>Sudamerica</option>
            <option value='int'>Internacionales</option>
            <option value='eu'>Europeos</option>
          </select>
        </div>
        <div className='row row-cols-6'>
          {
           listaMostrar.map(i => (
              <div className='col'>
                <div className='card' onClick={e => { handleClick(e) }}>
                  <div className='card-body'>
                    <h5 className='card-title'>{i}</h5>
                  </div>
                </div>
              </div>

            ))
          }
        </div>
      </div>
      {/* <div className="lista-generos">
        <Link to='/create' className="btn btn-primary float-md-none">crear Genero</Link>
      </div> */}
    </>


  );
};

export default Generos;