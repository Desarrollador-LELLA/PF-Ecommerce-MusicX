import React, { useState, useEffect } from "react";
import ProductCards from "../com/ProductCards";
import s from "../../css/SearchProduct.module.css";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc, faGaugeSimple, faMusic, faTag,faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Button, Spinner } from "react-bootstrap";
import { todosDocumentos } from "../../utils/metodosFirebase";
import { getKeys } from "../../utils/keysActions";
import { getGeneros } from "../../utils/generosActions";
import { Pagination } from "react-bootstrap";
import { paginacion } from "../../utils/libreria";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { filterProducts } from "../../utils/searchFunction";
import a from "../../css/ProductCards.module.css"
import { unDocumentoCallback } from "../../utils/metodosFirebase";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

const INITIAL_PAGINADO = {
  coleccion: "productos",
  ordenarPor: "nombre",
  whereFiltros: null,
  lista: [],
  itemPorPagina: 12,
  paginaActual: 1,
};

const FILTROS ={
  opDesc :null,
  opAsce: null,
  opAZ: null, 
  opZA:null, 
  opSinOrden:null,
  search:"",
  generos:[],
  keyF:null,
  bpmMin:null,
  bpmMax:null,
  precioMin:null,
  precioMax:null
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

  const onPene = (e)=>{
    if(filtros.generos.includes(e.target.name)){
      setFiltros({...filtros,generos:filtros.generos.filter(el => el!== e.target.name)})
      setEstadoInicial({
        ...estadoInicial,
        paginaActual: 1,
      });
    } else

    setFiltros({...filtros,generos:[...filtros.generos,e.target.name]})
    setEstadoInicial({
      ...estadoInicial,
      paginaActual: 1,
    });
  }

  const onChangeKey = (e)=>{
      setFiltros({...filtros,keyF:e.target.value})
      setEstadoInicial({
        ...estadoInicial,
        paginaActual: 1,
      });
  }
  const onChangeBPMMin = (e)=>{
    setFiltros({...filtros,bpmMin:e.target.value})
    setEstadoInicial({
      ...estadoInicial,
      paginaActual: 1,
    });
  }
  const onChangeBPMMax = (e)=>{
    setFiltros({...filtros,bpmMax:e.target.value})
    setEstadoInicial({
      ...estadoInicial,
      paginaActual: 1,
    });
  }

  const onChangePriceMin = (e)=>{
    setFiltros({...filtros,precioMin:e.target.value})
    setEstadoInicial({
      ...estadoInicial,
      paginaActual: 1,
    });
  }
  const onChangePriceMax = (e)=>{
    setFiltros({...filtros,precioMax:e.target.value})
    setEstadoInicial({
      ...estadoInicial,
      paginaActual: 1,
    });
  }
  const resetFiltros=(e)=>{
    window.location.reload();
  }

  useEffect(() => {
    llenarLista();
    llenarGeneros(); 
    llenarKeys();
  }, []);
  
  
  useEffect(()=>{
    setFiltros({...filtros,search:!tester ? null:tester.search.slice(1)})
  },[tester])
  
  const llenarKeys = async ()=>{
    await unDocumentoCallback("keys", "dogKeys", (retorno) => {
      setKeys(retorno.result.keys)
    });  
  }
  const llenarGeneros = async ()=>{
    await unDocumentoCallback("generos", "docGenero", (retorno) => {
      setGeneros(retorno.result.generos);
    });    
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
      <h1 className={s.searched}>{tester.search =="?undefined" ? "":tester.search.slice(1).replaceAll('%20', ' ').toUpperCase()}...</h1>
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
                        <Form.Check className={s.gencheck} key={i.nombre} onClick={onPene} type="switch" id="custom-switch" name={i.nombre} label={i.nombre}/>  
                        )) : null  //ACA SE DEBE MOSTRAR AL USUARIO QUE NO EXISTEN GENEROS EN CASO DE BUSQUEDA O AL INICIAR
                  }
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className={s.acordion} eventKey="1">
                <Accordion.Header><FontAwesomeIcon icon={faMusic}/>KEY</Accordion.Header>
                <Accordion.Body>
                <Form >
                  <Form.Select className={s.select} onChange={onChangeKey} aria-label="Default select example">
                    <option hidden>Select KEY</option>
                    <option value="All">All</option>
                    {
              keys.length ?
                keys.map(i =>(
                          <option className={s.option} key={i.id} value={i.nombre}>{i.nombre}</option>    
                )) : null  //ACA SE DEBE MOSTRAR AL USUARIO QUE NO EXISTEN GENEROS EN CASO DE BUSQUEDA O AL INICIAR
          }
                  </Form.Select>
                </Form>
                </Accordion.Body>
              </Accordion.Item  >
              <Accordion.Item className={s.acordion} eventKey="2">
                <Accordion.Header> <FontAwesomeIcon icon={faGaugeSimple}/>BPM</Accordion.Header>
                <Accordion.Body>
                <Form.Control
                className={s.input}
                  onChange={onChangeBPMMin}
                  type="number"
                  placeholder="Min"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"/>
                  <Form.Control
                  onChange={onChangeBPMMax}
                  className={s.input}
                  placeholder="Max"
                  type="number"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"/>
                </Accordion.Body>
              </Accordion.Item >
              <Accordion.Item className={s.acordion} eventKey="3">
                <Accordion.Header> <FontAwesomeIcon icon={faDollarSign}/>Precio</Accordion.Header>
                <Accordion.Body>
                <Form.Control
                className={s.input}
                  onChange={onChangePriceMin}
                  type="number"
                  placeholder="Min"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"/>
                  <Form.Control
                  className={s.input}
                  onChange={onChangePriceMax}
                  placeholder="Max"
                  type="number"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"/>
                </Accordion.Body>
              </Accordion.Item >  
            </Accordion>
            <Button variant="outline-secondary" className={s.buttonreset} onClick={resetFiltros}><FontAwesomeIcon className={s.iconreset} icon={faRotateRight}/></Button>
          </div>
        </div>
        <div className={`${a.productcards} container`}>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} xxl={4} className="g-5">
        {loading ? (
          <Spinner animation="border" variant="light" />
        ) : filteredProducts.length ? (
         
          filteredProducts.slice(inicio, fin).map((x) => (
            x.habilitado?
            <Col key={x.id} className={a.card}>
              <Card  className={`my-2 ${a.cardcont} h-100`}>
                <div className={a.contcards}>
                  <Link to={`/${x.id}`}>
                    <Card.Img
                      className={a.cardimg}
                      variant="top"
                      src={x.imagen}
                    />
                  </Link>
                </div>
                <Card.Body>
                  <Card.Title className={a.cardtitle}>{x.nombre}</Card.Title>
                  <Card.Text className={a.cardby}>BY {x.autor}</Card.Text>
                  <Card.Text className={a.cardby}>BPM:{x.tiempo}</Card.Text>
                  <div className={a.marquee}>
                    <Card.Text className={a.carddesc}>
                      {x.descripcion}
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            :null
          ))
        ) : <h1>{"No se encontraron Beats :("}</h1>}
      </Row>
      <div className={s.paginationcontainer}>
      <Pagination className={s.paginationcontainer}>
        <Pagination.Prev onClick={anterior} />
        <Pagination.Item
        className={s.button}
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
    </div>
  );
}
