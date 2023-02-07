import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner, Pagination } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { paginacion } from '../../utils/libreria';
import { todosDocumentos, mostrarImgen, obtienePaginado, siguientePaginado, anteriorPaginado, cambiaPaginado, unDocumento } from '../../utils/metodosFirebase';
import styles from "../../css/Bibloteca.module.css"
import { useSelector } from 'react-redux';
import { async } from '@firebase/util';
import descarga from "../images/descarga.png"
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const INITIAL_BIBLIOTECA = {
  lista: [],
  itemPorPagina: 4,
  paginaActual: 1,
};

export default function Bibloteca() {

  const { usuarioAuth } = useSelector((state) => state.auth)
  const [estadoInicial, setEstadoInicial] = useState(INITIAL_BIBLIOTECA);
  const [loading, setLoading] = useState(false);
  const { cantPaginas, fin, inicio, paginasBar } = paginacion(estadoInicial.lista.length, estadoInicial.paginaActual, estadoInicial.itemPorPagina);

  useEffect(() => {
    traemeBiblioteca();
  }, []);

  const traemeBiblioteca = async () => {
    setLoading(true);
    const usuario = await unDocumento("usuarios", usuarioAuth.id);
    console.log(usuario, "arriba de if ")
    if (usuario.confirma) {
      setEstadoInicial({ ...estadoInicial, lista: usuario.result.biblioteca ? usuario.result.biblioteca : [] });
      console.log(usuario, "dentro de if ")

    }
    setLoading(false);

  };

  const playaudio = async () =>{
     const  audio = document.getElementById("audioMusica")
      audio.play()
  }


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







  return (
    <Container className='my-3' fluid>
      {console.log(estadoInicial)}
      <h1 className={styles.titulo}> Biblioteca</h1>
      <Row xs={2} sm={3} md={3} lg={4} xl={5} xxl={6} className="g-4 d-flex justify-content-center">
        {
          loading ? <Spinner animation="border" variant="light" /> :
            estadoInicial.lista.length ?
              estadoInicial.lista.slice(inicio, fin).map((x) => (
                <Col key={x.id}>
                  <Card className={`${styles.card_biblioteca} h-100`}>
                    <div className={styles.reproducir}>
                      <Card.Img onMouseOver={() => playaudio} variant="top" className={`${styles.img_biblioteca} rounded-circle p-4`} src={x.imagen} />
                     
                    </div>
                    
                    <Card.Body>
                      <Card.Title className={`${styles.cardtitulo_biblioteca}`}>{x.nombre} <a className={styles.descarga} href={x.licencias.url} download={`${x.nombre}.rar`}> <i className={styles.icono}><FontAwesomeIcon icon={faCircleArrowDown}  /></i> </a></Card.Title>
                      <Card.Text className={`${styles.cardtext_biblioteca}`}>
                       {x.licencias.TipoLicencia} {x.licencias.descripcion}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              )) : <h1 className={styles.nohay} >No hay beat</h1>
        }
      </Row>
      <Pagination className={styles.paginado} >
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










    // <div className={styles.contenedor}>
    //   {/* <h1 className={styles.titulo}> Biblioteca</h1>
    //   <div className= {styles.elementos}>
    //     {biblioteca?.map((elemento) => {
    //       return (
    //         <div className={styles.elemento}>
    //           <img src={elemento.imagen} />
    //           <div className={styles.descripcion}>
    //             <h1>{elemento.nombre}</h1>
    //             <p>{elemento.tiempo}</p>
    //           </div>
    //         </div>

    //       ) 
    //     }) } */}
    //   {/* </div> */}
    // </div>

  )
}
