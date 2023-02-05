import ProductCards from "../com/ProductCards";
import TopBeats from "../com/TopBeats";
import s from "../../css/Home.module.css";
import Paginate from "../com/Paginate";
import { LimpiarDetalleProd } from "../../redux/actions/carritoAction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { unDocumentoCallback } from "../../utils/metodosFirebase";
import { Container, Row } from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LimpiarDetalleProd);
  });
  return (
    <div className={s.contendor}>
       <Container className={s.topbeats}>
        <h1>TOP BEATS!</h1>
      </Container>
      <Container>
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