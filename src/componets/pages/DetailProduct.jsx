import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import css from "../../css/detailproducto.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { object } from "prop-types";

export default function DetailProduct() {
  const [presioProducto, setPresioProducto] = useState("");
  const arryAux = [
    { nombre: "Licencia 1", id: "akshdsad3568", valor: 100 },
    { nombre: "Licencia 2", id: "aks1hd8", valor: 200 },
    { nombre: "Licencia 3", id: "aks3hd8", valor: 300 },
    { nombre: "Licencia 4", id: "aksh4d8", valor: 400 },
    { nombre: "Licencia 5", id: "aksh2d8", valor: 500 },
  ];

  function handlerLicencia(e) {
    let btnSelec = document.getElementById(e.target.id).parentNode;
    let boton = document.getElementById(e.target.id).childNodes;
    boton[1].style.display = "block";
    btnSelec.setAttribute(
      "Class",
      `card ${css.cardProducto} ${css.cardSelect}`
    );
    precioTotal(e.target.id);
    for (let i = 0; i < arryAux.length; i++) {
      if (i != e.target.id) {
        let btnNoSelect = document.getElementById(i).parentNode;
        let botonNoSelect = document.getElementById(i).childNodes;
        botonNoSelect[1].style.display = "none";
        btnNoSelect.setAttribute("Class", `card ${css.cardProducto}`);
      }
    }
  }
  function precioTotal(i) {
    setPresioProducto(arryAux[i].valor);
  }

  return (
    <div>
      <div>
        <Container>
          <div Style="margin-top: 50px"></div>
          <Row>
            <Col>
              <img
                className={`${css.imagenportada} img-fluid`}
                src="https://media.istockphoto.com/id/1352152504/es/vector/papel-negro-oscuro-abstracto-fondo-geom%C3%A9trico-cortado-fondo-futurista-moderno-se-puede-usar.jpg?s=612x612&w=0&k=20&c=WcJQBCdFP2jUSRtvxJcnuwa5PO3OjGJcvLM6Tvkox7Q="
                alt=""
              />
              <p Style="margin-top: 20px" className="text-break ">
                Aqui va el genero y la descripcion del NombreProducto y
                contenido basura para rellenar el formato y ahcer dle mundo un
                mejor lugar para codear y contenido basura para rellenar el
                formato y ahcer dle mundo un mejor lugar para codear
              </p>
              <div Style="display:flex; justify-content: center; aling-items: center;">
                <audio controls controlslist="nodownload">
                  <source
                    src="https://firebasestorage.googleapis.com/v0/b/orion-proyect.appspot.com/o/BOM%20BAP%20TYPE%201%2FBASE%20BOMBAP%20TYPE.wav?alt=media&token=cde04954-46db-44aa-bbd6-1f7e1a97e3d0"
                    type="audio/wav"
                  />
                </audio>
              </div>
            </Col>
            <Col>
              <Row>
                <Col Style="padding-left: 30px;">
                  <h1>NombreProducto</h1>
                  valor: $100 + licencia ${presioProducto}
                </Col>
              </Row>
              <div className={`${css.divLicencias} shadow-sm `}>
                <ListGroup>
                  {arryAux.map((obj, indx) => (
                    <div key={indx} onClick={(e) => handlerLicencia(e)}>
                      <Card className={`${css.cardProducto}`}>
                        <Card.Body id={indx} value={obj.valor}>
                          {`${obj.nombre} detalle de la licencia' `}
                          <Button
                            name="boton"
                            className="float-end"
                            variant="success"
                          >
                            ${obj.valor}
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
      </div>
    </div>
  );
}
