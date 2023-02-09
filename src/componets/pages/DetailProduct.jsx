import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import css from "../../css/detailproducto.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import { Card, Spinner, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { getProducto, addProducto } from "../../redux/actions/carritoAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import icMeGusta from "../images/ic_megusta.svg";
import icNoMeGusta from "../images/ic_nomegusta.svg";
import { actualizaDocumento } from "../../utils/metodosFirebase";
import { arrayRemove, arrayUnion } from "firebase/firestore";

export default function DetailProduct() {
  const dispatch = useDispatch();
  const navegar = useNavigate();
  const { id } = useParams();
  const { usuarioAuth } = useSelector((state) => state.auth);
  const [presioProducto, setPresioProducto] = useState("");
  const { productoUnoDetalle } = useSelector((state) => state.carrito);
  const [loadding, setLoadding] = useState(false);
  const [licenNoCompra, setLicenNoCompra] = useState();
  const [loadingGusta, setLoadingGusta] = useState(false);

  useEffect(() => {
    dispatch(getProducto(id)).then(() => {
      setLoadding(true);
    });
  }, []);

  function handleAddToCart(producto, e) {
    const productoAgregar = {
      ...producto,
      licencias: producto.licencias[e.target.id],
    };
    dispatch(addProducto(productoAgregar));
    // alert("PRODUCTO AGREGADO AL CARRITO");
  }
  const handlerLicenciasNoCompradas = (e) => {};

  function handlerLicencia(e) {
    let btnSelec = document.getElementById(e.target.id).parentNode;
    let boton = document.getElementById(e.target.id).childNodes;
    boton[1].style.display = "block";
    btnSelec.setAttribute(
      "Class",
      `card ${css.cardProducto} ${css.cardSelect}`
    );
    precioTotal(e.target.id);
    for (let i = 0; i < productoUnoDetalle.licencias.length; i++) {
      if (i != e.target.id) {
        let btnNoSelect = document.getElementById(i).parentNode;
        let botonNoSelect = document.getElementById(i).childNodes;
        botonNoSelect[1].style.display = "none";
        btnNoSelect.setAttribute("Class", `card ${css.cardProducto}`);
      }
    }
  }
  function precioTotal(i) {
    setPresioProducto(productoUnoDetalle.licencias[i].precio);
  }

  const megusta = async () => {
    setLoadingGusta(true);
    if (productoUnoDetalle?.like?.megusta?.includes(usuarioAuth.id)) {
      const retorno = await actualizaDocumento("productos", id, {
        data: { "like.megusta": arrayRemove(usuarioAuth.id) },
      });
      if (retorno.confirma) {
        dispatch(getProducto(id, setLoadding, handlerLicenciasNoCompradas));
      }
    } else {
      const retorno = await actualizaDocumento("productos", id, {
        data: {
          "like.megusta": arrayUnion(usuarioAuth.id),
          "like.nomegusta": arrayRemove(usuarioAuth.id),
        },
      });
      if (retorno.confirma) {
        dispatch(getProducto(id, setLoadding, handlerLicenciasNoCompradas));
      }
    }
    setLoadingGusta(false);
  };

  const nomegusta = async () => {
    setLoadingGusta(true);
    if (productoUnoDetalle?.like?.nomegusta?.includes(usuarioAuth.id)) {
      const retorno = await actualizaDocumento("productos", id, {
        data: { "like.nomegusta": arrayRemove(usuarioAuth.id) },
      });
      if (retorno.confirma) {
        dispatch(getProducto(id, setLoadding, handlerLicenciasNoCompradas));
      }
    } else {
      const retorno = await actualizaDocumento("productos", id, {
        data: {
          "like.nomegusta": arrayUnion(usuarioAuth.id),
          "like.megusta": arrayRemove(usuarioAuth.id),
        },
      });
      if (retorno.confirma) {
        dispatch(getProducto(id, setLoadding, handlerLicenciasNoCompradas));
      }
    }
    setLoadingGusta(false);
  };

  return (
    <div>
      {loadding ? (
        <div>
          <div>
            <Container ntainer>
              <Button className="my-3" onClick={() => navegar(-1)}>
                Volver
              </Button>
              <Row>
                <Col>
                  <div className={css.box}>
                    <img
                      className={`${css.imagenportada} img-fluid`}
                      src={productoUnoDetalle.imagen}
                      alt=""
                    />
                    <div className={css.hover}>
                      <audio controls>
                        <source
                          src={productoUnoDetalle.audio}
                          type="audio/mpeg"
                        />{" "}
                      </audio>
                    </div>
                  </div>
                  <div className={css.divgeneros}>
                    <h3 className={` ${css.generos} ${css.tituloProducto}`}>
                      {productoUnoDetalle.key}
                    </h3>
                    {productoUnoDetalle.genero?.map((e) => (
                      <h3 className={` ${css.generos} ${css.tituloProducto}`}>
                        {e}
                      </h3>
                    ))}
                  </div>
                </Col>
                <Col>
                  <Row>
                    <Col Style="padding-left: 30px;">
                      <h1 className={css.tituloProducto}>
                        {`${productoUnoDetalle.nombre} - ${productoUnoDetalle.autor}`}
                      </h1>

                      <p className={`text-break ${css.texto}`}>
                        {productoUnoDetalle.descripcion}
                        <br />
                        valor: ${presioProducto ? presioProducto : 0}
                      </p>
                    </Col>
                  </Row>
                  <p className={`text-center ${css.texto}`}>Lista Licencias</p>
                  <div className={`${css.divLicencias} shadow-sm `}>
                    <ListGroup>
                      {productoUnoDetalle.licencias?.map((obj, indx) => (
                        <div key={indx} onClick={(e) => handlerLicencia(e)}>
                          <Card className={`${css.cardProducto}`}>
                            <Card.Body id={indx} value={obj.precio}>
                              {`${obj.TipoLicencia}  ${obj.descripcion}' `}
                              <Button
                                id={indx}
                                name="boton"
                                Style="display: none"
                                className={`float-end btn btn-light ${css.btonLicencia} `}
                                onClick={(e) =>
                                  handleAddToCart(productoUnoDetalle, e)
                                }
                                value={obj.precio}
                              >
                                ${obj.precio}
                              </Button>
                            </Card.Body>
                          </Card>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </Col>
              </Row>
              <Button
                className="me-3"
                onClick={megusta}
                disabled={loadingGusta}
              >
                <Image src={icMeGusta} />
                <span className="mx-3">
                  {productoUnoDetalle?.like?.megusta
                    ? productoUnoDetalle.like.megusta.length
                    : 0}
                </span>
              </Button>
              <Button onClick={nomegusta}>
                <span className="mx-3" disabled={loadingGusta}>
                  {productoUnoDetalle?.like?.nomegusta
                    ? productoUnoDetalle.like.nomegusta.length
                    : 0}
                </span>
                <Image src={icNoMeGusta} />
              </Button>
            </Container>
            <div className={css.espaciado}></div>
          </div>{" "}
        </div>
      ) : (
        <Spinner animation="grow" />
      )}
    </div>
  );
}
