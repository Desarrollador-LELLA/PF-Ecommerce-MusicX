import {
  ELIMINAR_PRODUCTO,
  PAGAR,
  DETALLE_UN_PRODUCTO,
} from "../types/carritoTypes.js";
import { allDb, db } from "../../firebaseInicial/firebase";

export const pagarCarrito = () => {
  return "Aun no se hace";
};

//RECIBE EL ID EL PRODUCTO AGREGADO AL CARRITO PARA PASARSELO AL REDUCER Y QUE LO ELIMINE.
export const eliminarProducto = (id) => {
  return {
    type: ELIMINAR_PRODUCTO,
    payload: id,
  };
};

export const getProducto = (id) => {
  return async (dispatch) => {
    const docRef = allDb.doc(db, "productos", `${id}`);
    const docSnap = await allDb.getDoc(docRef);
    dispatch({
      type: DETALLE_UN_PRODUCTO,
      payload: docSnap.data(),
    });
  };
};
