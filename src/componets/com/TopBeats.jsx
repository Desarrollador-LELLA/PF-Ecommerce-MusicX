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
    <div className={s.dadcontainer}>
    <>
      {productos.length && (
        <>
          <Carousel variant="withe" className={s.carrusel}>
            <Carousel.Item>
              <Image
                className="d-block w-100"
                src={productos[productos.length -1].data().imagen}
                alt="First slide"
              />
              <Carousel.Caption>
                <Link to={productos[[productos.length -1]].id}>
                  <h3 className={`display-1 ${s.title}`}>
                    {productos[[productos.length -1]].data().nombre}
                  </h3>
                </Link>
                  <span className={s.contby}>
                    <p className="display-4">BY:{productos[[productos.length -1]].data().autor}</p>
                  </span>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image
                fluid="true"
                className="d-block w-100"
                src={productos[[productos.length -2]].data().imagen}
                alt="Third slide"
              />

              <Carousel.Caption>
                <Link to={productos[[productos.length -2]].id}>
                  <h3 className="display-1">{productos[[productos.length -2]].data().nombre}</h3>
                </Link>
                <p className="display-4">BY:{productos[[productos.length -2]].data().autor}</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Image
                fluid="true"
                className="d-block w-100"
                src={productos[[productos.length -5]].data().imagen}
                alt="Third slide"
              />

              <Carousel.Caption>
                <Link to={productos[productos.length -5].id}>
                  <h3 className="display-1">{productos[[productos.length -5]].data().nombre}</h3>
                </Link>
                <p className="display-4">BY:{productos[[productos.length -5]].data().autor}</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </>
      )}
    </>
    </div>
  );
}
