import { Link, useNavigate } from "react-router-dom";
import styleCarrito from "../../css/Carrito.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/carritoAction";
import PaypalButton from "../com/Paypal";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Carrito = () => {
  const infoTotal = [];
  const productos = useSelector((store) => store.carrito.productos);
  const idUser = useSelector((store) => store.auth.usuarioAuth.id);
  const dispatch = useDispatch();
  const navegar = useNavigate();

  const products = () => {
    return productos.map((producto) => {
      return {
        reference_id: producto.id,
        description: producto.nombre,
        amount: {
          currency: "USD",
          value: producto.licencias.precio.toString(),
        },
      };
    });
  };

  const handleQuitarProducto = (id) => {
    dispatch(actions.quitarProducto(id));
  };

  const totalCalculator = () => {
    return Math.floor(
      productos.reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.licencias.precio),
        0
      )
    ).toString();
  };

  productos.forEach((producto) => infoTotal.push(`${producto.nombre} (1)`));

  const handleBiblioteca = () => {
        dispatch(actions.addBiblioteca(productos, idUser))  
  };

  return (
    <div className={styleCarrito.container}>
      <div className={styleCarrito.nav}>
        <Link to="/">
          <h3>Volver</h3>
        </Link>
      </div>
      <div className={styleCarrito.productContainer}>
        {productos.map((data) => {
          return (
            <div className={styleCarrito.product}>
              <img src={data.imagen} alt="" width="150px" />
              <div className={styleCarrito.detailProduct}>
                <h1>{data.nombre}</h1>
                <h2>Autor:{data.autor}</h2>
                <h2>Tiempo:{data.tiempo}</h2>
              </div>
              <h2>{data.licencias.precio} USD</h2>
              <button onClick={() => handleQuitarProducto(data.id)}>
                <strong>X</strong>
              </button>
            </div>
          );
        })}
      </div>
      <div className={styleCarrito.navCount}>
        <div>
          <h1>
            TOTAL = {totalCalculator()} <strong>USD</strong>
          </h1>
        </div>
        <div>
          <p>{infoTotal.join(" , ")}</p>
        </div>
        <div className={styleCarrito.paypalButton}>
          <PayPalScriptProvider
            options={{ "client-id": "test", "merchant-id": "WEMW3RY93ABLA" }}
          >
            <PaypalButton
              currency={"USD"}
              showSpinner={false}
              amount={totalCalculator()}
              products={products()}
              productos={productos}
              handleBiblioteca={handleBiblioteca}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
