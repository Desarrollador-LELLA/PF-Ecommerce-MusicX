import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductos } from "../../redux/actions/productoAction";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import s from "../../css/ProductCards.module.css";
import { Link } from "react-router-dom";
export default function ProductCards(props) {
  const [productos, setProductos] = useState([]);
  const ese = async () => {
    const xd = await getProductos();
    setProductos(xd);
  };
  useEffect(() => {
    ese();
  }, []);

  return (
    <div className={s.productcards}>
      <Row xs={3} md={5} className="g-4">
        {productos?.map((ele) => (
          <Col key={ele.data().key}>
            <Card>
              <div>
                <Link to={ele.data().id}>
                  <Card.Img variant="top" src={ele.data().imagen} />
                </Link>
              </div>
              <Card.Body>
                <Card.Title>{ele.data().nombre}</Card.Title>
                <Card.Text>
                  <strong> By:{ele.data().autor}</strong>
                </Card.Text>
                <Card.Text>BPM:{ele.data().tiempo}</Card.Text>
                <Card.Text>{ele.data().descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
