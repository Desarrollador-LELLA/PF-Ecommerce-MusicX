import { Link, useNavigate } from "react-router-dom";
import styleCarrito from "../../css/Carrito.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions/carritoAction";
import PaypalButton from "../com/Paypal";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';

const Carrito = () => {
  const infoTotal = [];
  const productos = useSelector((store) => store.carrito.productos);
  const idUser = useSelector((store) => store.auth.usuarioAuth.id);
  const dispatch = useDispatch();
  const navegar = useNavigate();
    
  const products = () => {
    return productos.map((producto) => { 
      return {
        reference_id: Math.floor(Math.random() * producto.licencias.precio),
        description: producto.nombre,
        amount: {
          currency: "USD",
          value: producto.licencias.precio.toString(),
        },
      };
    });
  };

  const productosPaypal = products();

  const handleQuitarProducto = (id, licencia) => {
    dispatch(actions.quitarProducto(id, licencia));
  };

  const totalCalculator = () => {
    return productos.reduce(
        (accumulator, currentValue) =>
          accumulator + Number(currentValue.licencias.precio),
        0
      ).toString();
  };
  
  const amount = totalCalculator()
  productos.forEach((producto) => infoTotal.push(`${producto.nombre} (1)`));

  const handleAlert = () => {
    setTimeout(function(){
      swal("Tu compra ha sido exitosa",'Ya puedes mirar tus productos en la biblioteca', 'success', {
        buttons: {
            cancel: 'ir mas Tarde',
            catch: {
                text: 'ir a Biblioteca',
                value: "catch",
            },
        },
        })
        .then((value) => {
        switch (value) {
           case "catch":
            navegar('/bibloteca');
            break;
           default:
            swal("Gracias por adquirir nuestros productos!");
         }
    });    }, 1800);;  }

  const handleBiblioteca = () => {
        dispatch(actions.addBiblioteca(productos, idUser));
        dispatch(actions.LimpiarDetalleCarrito());
        dispatch(actions.enviarCorreo(idUser))
  };

  return (
    <div className={styleCarrito.container}>
      <div className={styleCarrito.nav}>
        <Link to="/">
          <h3>Volver</h3>
        </Link>
      </div>
        {productos.length ? <div className={styleCarrito.productContainer}>
        {productos.map((data) => {
          return (
            <div className={styleCarrito.product}>
              <img src={data.imagen} alt="" width="150px" />
              <div className={styleCarrito.detailProduct}>
                <h1>{data.nombre}</h1>
                <h2>Autor:{data.autor}</h2>
                <h2>Tiempo:{data.tiempo}</h2>
              </div>
          <div className={styleCarrito.detailProduct}>
                    <h1>{data.licencias.TipoLicencia}</h1>
                </div>
              <h2>{data.licencias.precio} USD</h2>
              <button onClick={() => handleQuitarProducto(data.id, data.licencias)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          );
        })}
        </div>
            : <h2 className={styleCarrito.noProducts}>Aun no has añadido productos al carrito :(</h2>}
      
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
            <PayPalScriptProvider deferLoading={true} options={{ "client-id": "AViYeevPmBZP9zuIlYewQ3mT85uwwkbkwAlll9jDrEoFafYxRMI7o2omsscx3EbICY0fpkSE5VY0fXIO", "merchant-id": "WEMW3RY93ABLA" }}>
            <PaypalButton
              currency={"USD"}
              showSpinner={false}
              amount={amount}
              products={productosPaypal}
              handleBiblioteca={handleBiblioteca}
              handleAlert={handleAlert}
            />
            </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
