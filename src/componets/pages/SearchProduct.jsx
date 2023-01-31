import React, { useState, useEffect } from "react";
import ProductCards from "../com/ProductCards";
import s from "../../css/SearchProduct.module.css";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc, faGaugeSimple, faMusic, faTag } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "react-bootstrap";
import { todosDocumentos
 } from "../../utils/metodosFirebase";
import { getKeys } from "../../utils/keysActions";
import { getGeneros } from "../../utils/generosActions";
import { Pagination } from "react-bootstrap";
import { paginacion } from "../../utils/libreria";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { filterProducts } from "../../utils/searchFunction";

const INITIAL_PAGINADO = {
  coleccion: "productos",
  ordenarPor: "nombre",
  whereFiltros: null,
  lista: [],
  itemPorPagina: 10,
  paginaActual: 1,
};

const FILTROS ={
  opDesc :null,
  opAsce: null,
  opAZ: null, 
  opZA:null, 
  opSinOrden:null,
  search:null,
  generos:[],
  keyF:null
}

export default function SearchProduct() {

  const tester = useLocation();
  const [estadoInicial, setEstadoInicial] = useState(INITIAL_PAGINADO);
  const [filtros,setFiltros] = useState(FILTROS)
  const filteredProducts = filterProducts(filtros,estadoInicial.lista)
  const [keys, setKeys] = useState([]);
  const [generos,setGeneros] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cantPaginas, fin, inicio, paginasBar } = paginacion(
    filteredProducts.length,
    estadoInicial.paginaActual,
    estadoInicial.itemPorPagina
  );
  const filtroGeneros =[] 

  const onPene = (e)=>{
    if(filtros.generos.includes(e.target.name)){
      setFiltros({...filtros,generos:filtros.generos.filter(el => el!== e.target.name)})
    } else
    setFiltros({...filtros,generos:[...filtros.generos,e.target.name]})
  }
  const onChangeKey = (e)=>{
      setFiltros({...filtros,keyF:e.target.value})
  }
  useEffect(() => {
    llenarKeys();
    llenarGeneros(); 
    llenarLista();
  }, []);
  
  useEffect(()=>{
    setFiltros({...filtros,search:!tester ? null:tester.search.slice(1)})
  },[tester])

  const llenarKeys = async ()=>{
    const list = await getKeys()
    setKeys(list)
  }
  const llenarGeneros = async ()=>{
    const list = await getGeneros()
    setGeneros(list)
  }

  const llenarLista = async () => {
    setLoading(true);
    const list = await todosDocumentos(
      INITIAL_PAGINADO.coleccion,
      INITIAL_PAGINADO.ordenarPor,
      INITIAL_PAGINADO.whereFiltros,
      () => {
        setLoading(false);
      }
    );
    setEstadoInicial({ ...estadoInicial, lista: list.result });
  };

  const cambiarPagina = (e) => {
    const nom = e.target.innerText;
    setEstadoInicial({ ...estadoInicial, paginaActual: parseInt(nom) });
  };

  const anterior = () => {
    if (estadoInicial.paginaActual - 1 < 1) return;
    setEstadoInicial({
      ...estadoInicial,
      paginaActual: estadoInicial.paginaActual - 1,
    });
  };

  const siguiente = () => {
    if (estadoInicial.paginaActual + 1 > cantPaginas) return;
    setEstadoInicial({
      ...estadoInicial,
      paginaActual: estadoInicial.paginaActual + 1,
    });
  };


  return (
    <div>
      <h1 className={s.searched}>{!tester ? " ":tester.search.slice(1)}...</h1>
      <div className={s.dadcontainer}>
        <div className={s.filtercontainer}>
          <div>
            <h2 className={s.titlefilter}>Filtros</h2>
          </div>
          <div className={s.containerfilters}>
            <Accordion className={s.acordion} defaultActiveKey="0">
              <Accordion.Item className={s.acordion} eventKey="0">
                <Accordion.Header className={s.acordion}><FontAwesomeIcon icon={faCompactDisc}/> Generos</Accordion.Header>
                <Accordion.Body className={s.acordion} >
                  <Form className={s.acordion}>
                    
                  {generos.length ?
                    generos.map(i =>(
                        <Form.Check className={s.gencheck} key={i.data().nombre} onClick={onPene} type="switch" id="custom-switch" name={i.data().nombre} label={i.data().nombre}/>  
                                  
                        )) : null  //ACA SE DEBE MOSTRAR AL USUARIO QUE NO EXISTEN GENEROS EN CASO DE BUSQUEDA O AL INICIAR
                  }
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className={s.acordion} eventKey="1">
                <Accordion.Header><FontAwesomeIcon icon="fa-thin fa-piano" /><FontAwesomeIcon icon={faMusic}/>KEY</Accordion.Header>
                <Accordion.Body>
                <Form >
                  <Form.Select onChange={onChangeKey} aria-label="Default select example">
                    <option hidden>Select KEY</option>
                    <option value="All">All</option>
                    {
              keys.length ?
                keys.map(i =>(
                          <option className={s.option} key={i.data().nombre} value={i.data().nombre}>{i.data().nombre}</option>    
                          
                )) : null  //ACA SE DEBE MOSTRAR AL USUARIO QUE NO EXISTEN GENEROS EN CASO DE BUSQUEDA O AL INICIAR
          }
                  </Form.Select>
                </Form>
                </Accordion.Body>
              </Accordion.Item  >
              {/* <Accordion.Item className={s.acordion} eventKey="2">
                <Accordion.Header> <FontAwesomeIcon icon={faGaugeSimple}/>BPM</Accordion.Header>
                <Accordion.Body>
                <Form.Control
                  type="number"
                  placeholder="Min"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"/>
                  <Form.Control
                  placeholder="Max"
                  type="number"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"/>
                </Accordion.Body>
              </Accordion.Item > */}
            </Accordion>
          </div>
        </div>
        <div className={`${s.productcards} container`}>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} xxl={4} className="g-5">
        {loading ? (
          <Spinner animation="border" variant="light" />
        ) : filteredProducts.length ? (
          filteredProducts.slice(inicio, fin).map((x) => (
            <Col key={x.id} className={s.card}>
              <Card className={`my-2 ${s.cardcont}`}>
                <div className={s.contcards}>
                  <Link to={`/${x.id}`}>
                    <Card.Img
                      className={s.cardimg}
                      variant="top"
                      src={x.imagen}
                    />
                  </Link>
                </div>
                <Card.Body>
                  <Card.Title className={s.cardtitle}>{x.nombre}</Card.Title>
                  <Card.Text className={s.cardby}>BY {x.autor}</Card.Text>
                  <Card.Text className={s.cardby}>BPM:{x.tiempo}</Card.Text>
                  <div className={s.marquee}>
                    <Card.Text className={s.carddesc}>
                      {x.descripcion}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : <h1>{"No se encontraron Beats :("}</h1>}
      </Row>
      <Pagination>
        <Pagination.Prev onClick={anterior} />
        <Pagination.Item
          onClick={cambiarPagina}
          active={paginasBar[0] === estadoInicial.paginaActual ? true : false}
        >
          {paginasBar[0]}
        </Pagination.Item>
        {paginasBar[1] && <Pagination.Ellipsis />}

        {paginasBar[2] && (
          <Pagination.Item
            onClick={cambiarPagina}
            active={paginasBar[2] === estadoInicial.paginaActual ? true : false}
          >
            {paginasBar[2]}
          </Pagination.Item>
        )}
        {paginasBar[3] && (
          <Pagination.Item
            onClick={cambiarPagina}
            active={paginasBar[3] === estadoInicial.paginaActual ? true : false}
          >
            {paginasBar[3]}
          </Pagination.Item>
        )}
        {paginasBar[4] && (
          <Pagination.Item
            onClick={cambiarPagina}
            active={paginasBar[4] === estadoInicial.paginaActual ? true : false}
          >
            {paginasBar[4]}
          </Pagination.Item>
        )}

        {paginasBar[5] && <Pagination.Ellipsis />}
        {paginasBar[6] && (
          <Pagination.Item
            onClick={cambiarPagina}
            active={paginasBar[6] === estadoInicial.paginaActual ? true : false}
          >
            {paginasBar[6]}
          </Pagination.Item>
        )}
        {<Pagination.Next onClick={siguiente} />}
      </Pagination>
    </div>
      </div>
    </div>
  );
}
