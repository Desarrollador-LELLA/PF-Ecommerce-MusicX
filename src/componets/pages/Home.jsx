import ProductCards from "../com/ProductCards";
import TopBeats from "../com/TopBeats";
import s from "../../css/Home.module.css";
import Paginate from "../com/Paginate";
import { LimpiarDetalleProd } from "../../redux/actions/carritoAction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { unDocumentoCallback } from "../../utils/metodosFirebase";
import { Button, Container, Row } from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LimpiarDetalleProd);
  });

  const envio = () => {
    
  };

  const envioCorreo = async () => {
    await fetch('https://api.sendinblue.com/v3/smtp/email', {
      method: 'POST',
      body: JSON.stringify({
        "sender": {
          "name": "TOP BEATS!",
          "email": "lella.soporte@gmail.com"
        },
        "to": [
          {
            "email": "lella.soporte@gmail.com",
            "name": "Luis LLancamil"
          }
        ],
        "subject": "Hello world",
        "htmlContent": "<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"
      }),
      headers: {
        'accept': 'application/json',
        'api-key': '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',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(data => {
        console.log('--------------------------------DATA -------------------------------------', data);
      })
      .catch(console.log);
  }

  return (
    <div className={s.contendor}>
      <Container className={s.topbeats}>
        <h1 className="justify-content-center">TOP BEATS!</h1>
      </Container>
      <Container>
        <Button onClick={envio}>ESTE BOTON SOLO TIENE 300 SOLICITUDES NO PRECIONAR SOLO PARA DIEGO</Button>
        <Row>
          <div className={`d-flex flex-wrap justify-content-center ${s.containerTopBeats}`}>
          <TopBeats/>
          </div>
          <ProductCards className="d-flex flex-wrap justify-content-center"/>
        </Row>
      </Container>
    </div>
  );
};

export default Home;