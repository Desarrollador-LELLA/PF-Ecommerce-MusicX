import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebaseInicial/firebase";
import { getProductos } from "../../redux/actions/productoAction";
import ProductCards from "../com/ProductCards";
import styles from "../../css/Bibloteca.module.css"

export default function Bibloteca({
  props
}) {
  // const [productos, setProductos] = useState([]);
  // const TodosLosProductos = async () => {
  //   const Todo = await getProductos();
  //   setProductos(Todo);
  // };

  const biblioteca = useSelector((store) => store.carrito.biblioteca)
  console.log(biblioteca)
  // useEffect(() => {

  //   console.log(productos)
  // }, []);


  return (
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}> Biblioteca</h1>
      <div className= {styles.elementos}>
        {biblioteca?.map((elemento) => {
          return (
            <div className={styles.elemento}>
              <img src={elemento.imagen} />
              <div className={styles.descripcion}>
                <h1>{elemento.nombre}</h1>
                <p>{elemento.tiempo}</p>
              </div>
            </div>
          )
        })}
      </div>






    </div>
















    // <div className={styles.fondo}>
    //   <h1 className={styles.compras}>Tu Compras</h1>
    //   <div className={styles.contenedor}>
    //     {biblioteca?.map((ele) =>
    //     (
    //       <div className={styles.imagen}>
    //         <h1 className ={styles.titulo}>{ele.nombre}</h1>
    //         <p>{ele.tiempo}</p>
    //         <img className={ styles. imagenes} src={ele.imagen}></img>
    //       </div>
    //     ))}
    //   <div className={styles.footer}></div>
    //   </div>

    // </div>
  )
}
