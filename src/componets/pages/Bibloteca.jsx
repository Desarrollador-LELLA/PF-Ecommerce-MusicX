import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebaseInicial/firebase";
import { getProductos } from "../../redux/actions/productoAction";
import ProductCards from "../com/ProductCards";
import styles from "../../css/Bibloteca.module.css"

export default function Bibloteca({
  props
}) {
  const [productos, setProductos] = useState([]);
  const TodosLosProductos = async () => {
    const Todo = await getProductos();
    setProductos(Todo);
  };

  useEffect(() => {
    TodosLosProductos();
    console.log(productos)
  }, []);


  return (
    <div className={styles.fondo}>
      <h1>Tu Compras</h1>
      <div className={styles.contenedor}>
        {productos?.map((ele) =>
        (
          <div className={styles.imagen}>
            <img className={ styles. imagenes} src={ele.data().imagen}></img>
            <h1>{ele.data().nombre}</h1>
            <p>{ele.data().tiempo}</p>
          </div>
        ))}
      <div className={styles.footer}></div>
      </div>
    </div>
  )
}
