import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductos } from "../../redux/actions/productoAction";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Pagination } from "react-bootstrap";
import s from "../../css/ProductCards.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  todosDocumentos,
  mostrarImgen,
  obtienePaginado,
  siguientePaginado,
  anteriorPaginado,
  cambiaPaginado,
} from "../../utils/metodosFirebase";
import { paginacion } from "../../utils/libreria";
import Spinner from "react-bootstrap/Spinner";

const INITIAL_PAGINADO = {
  coleccion: "productos",
  ordenarPor: "nombre",
  whereFiltros: null,
  lista: [],
  itemPorPagina: 4,
  paginaActual: 1,
};

export default function ProductCards(props) {
  const [estadoInicial, setEstadoInicial] = useState(INITIAL_PAGINADO);
  const [loading, setLoading] = useState(false);
  const { cantPaginas, fin, inicio, paginasBar } = paginacion(
    estadoInicial.lista.length,
    estadoInicial.paginaActual,
    estadoInicial.itemPorPagina
  );

  useEffect(() => {
    llenarLista();
  }, []);

  const llenarLista = async () => {
    setLoading(true);
    const list = await todosDocumentos(
      estadoInicial.coleccion,
      estadoInicial.ordenarPor,
      estadoInicial.whereFiltros,
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
    <div className={`${s.productcards} container`}>
      <Row xs={1} sm={2} md={3} lg={4} xl={4} xxl={4} className="g-5">
        {loading ? (
          <Spinner animation="border" variant="light" />
        ) : estadoInicial.lista.length ? (
          estadoInicial.lista.slice(inicio, fin).map((x) => (
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
        ) : null}
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
  );
}
