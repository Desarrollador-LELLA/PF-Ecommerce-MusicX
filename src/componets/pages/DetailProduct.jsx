import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import css from "../../css/detailproducto.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { getProducto, addProducto } from "../../redux/actions/carritoAction";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { async } from "@firebase/util";

export default function DetailProduct() {
  const dispatch = useDispatch();
  const navegar = useNavigate();
  const { id } = useParams();
  const [presioProducto, setPresioProducto] = useState("");
  const { productoUnoDetalle } = useSelector((state) => state.carrito);
  const [audio, setAudio] = useState(false);

  useEffect(() => {
    dispatch(getProducto(id, setAudio));
  }, []);

  function handleAddToCart(producto, e) {
    const productoAgregar = {
      ...producto,
      licencias: producto.licencias[e.target.id],
    };
    console.log("producto a agregar ", productoAgregar, producto);
    dispatch(addProducto(productoAgregar));
    // alert("PRODUCTO AGREGADO AL CARRITO");
  }

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

  return (
    <div>
      {audio ? (
        <div>
          <div>
            <Container ntainer>
              <Button onClick={() => navegar("/")}>Volver</Button>
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
            </Container>
            <div className={css.espaciado}></div>
          </div>{" "}
        </div>
      ) : (
        <div> LOADINGGGGGGGG..............</div>
      )}
    </div>
  );
}
