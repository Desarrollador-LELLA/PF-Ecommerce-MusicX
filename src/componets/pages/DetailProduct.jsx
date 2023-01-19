import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import css from "../../css/detailproducto.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function DetailProduct() {
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
                <Col>
                  <h1>NombreProducto</h1>
                </Col>
                <Col>
                  <h1>$ 1000 </h1>
                </Col>
              </Row>
              <div Style="overflow-y: scroll; height: 250px ; margin-top:100px">
                <ListGroup>
                  <Card Style="margin: 5px">
                    <Card.Body>
                      Licencia 1. con esta licencia obtienes uno malo{" "}
                      <Button variant="success">$10</Button>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Body>
                      Licencia 2. con esta licencia obtienes uno no tan malo{" "}
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Body>
                      Licencia 3 . con esta licencia obtienes uno bueno{" "}
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Body>
                      Licencia 4. con esta licencia obtienes el PRO
                    </Card.Body>
                  </Card>
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
