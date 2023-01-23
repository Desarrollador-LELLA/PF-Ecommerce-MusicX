import Carousel from "react-bootstrap/Carousel";
import React, { useEffect, useState } from "react";
import { getProductos } from "../../redux/actions/productoAction";
import s from "../../css/TopBeats.module.css";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

export default function TopBeats() {
  const [productos, setProductos] = useState([]);

  const ese = async () => {
    const xd = await getProductos();
    setProductos(xd);
  };
  useEffect(() => {
    ese();
  }, []);

  return (
    <>
      {productos.length && (
        <>
          <Carousel variant="withe" className={s.carrusel}>
            <Carousel.Item>
              <Image
                className="d-block w-100"
                src={productos[0].data().imagen}
                alt="First slide"
              />
              <Carousel.Caption>
                <Link to={productos[0].data().id}>
                  <h3 className={`display-1 ${s.title}`}>
                    {productos[0].data().nombre}
                  </h3>
                  <span className={s.contby}>
                    <p className="display-4">BY:{productos[0].data().autor}</p>
                  </span>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className="d-block w-100"
                src={productos[1].data().imagen}
                alt="Second slide"
              />

              <Carousel.Caption>
                <Link to={productos[1].data().id}>
                  <h3 className="display-1">{productos[1].data().nombre}</h3>
                </Link>
                <p className="display-4">BY:{productos[1].data().autor}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image
                fluid="true"
                className="d-block w-100"
                src={productos[2].data().imagen}
                alt="Third slide"
              />

              <Carousel.Caption>
                <Link to={productos[2].data().id}>
                  <h3 className="display-1">{productos[2].data().nombre}</h3>
                </Link>
                <p className="display-4">BY:{productos[2].data().autor}</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </>
      )}
    </>
  );
}
