import Carousel from 'react-bootstrap/Carousel';
import React, { useEffect, useState } from 'react';
import { getProductos } from '../../redux/actions/productoAction';
import s from "../../css/TopBeats.module.css"
export default function TopBeats() {

    const [productos,setProductos]=useState([]);
    
    const ese = async()=>{
            const xd = await getProductos();
            setProductos(xd)
        }
    useEffect(()=>{
        ese()
    },[])


  return (
    <>
    {productos.length && <>
    <Carousel className={s.carrusel}>
      <Carousel.Item >
        <img
          className="d-block w-100"
          src={productos[0].data().imagen}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="display-1">{productos[0].data().nombre}</h3>
          <p className="display-4">BY:{productos[0].data().autor}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={productos[1].data().imagen}
          alt="Second slide"
        />

        <Carousel.Caption>
        <h3 className="display-1">{productos[1].data().nombre}</h3>
        <p className="display-4">BY:{productos[1].data().autor}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={productos[2].data().imagen}
          alt="Third slide"
        />

        <Carousel.Caption>
        <h3 className="display-1">{productos[2].data().nombre}</h3>
        <p className="display-4">BY:{productos[2].data().autor}</p>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel> 
    </>}
    </>
  );
}

