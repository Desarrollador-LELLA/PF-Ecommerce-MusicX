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
      <Row xs={3} md={4} className="g-5">
        {productos?.map((ele) => (
          <Col className={s.card} key={ele.data().key}>
            <Card className={`my-5 ${s.cardcont}`}>
              <div className={s.contcards}>
                <Link to={ele.data().id}>
                  <Card.Img className={s.cardimg} src={ele.data().imagen} />
                </Link>
              </div>
              <Card.Body>
                <Card.Title className={s.cardtitle}>{ele.data().nombre}</Card.Title>
                <Card.Text>
                  <strong> By {ele.data().autor}</strong>
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
