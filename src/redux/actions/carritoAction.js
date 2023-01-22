import {
  ELIMINAR_PRODUCTO,
  PAGAR,
  DETALLE_UN_PRODUCTO,
  ADD_PRODUCTOS
} from "../types/carritoTypes.js";

import { allDb, db } from "../../firebaseInicial/firebase";
import { collection, getDocs } from "firebase/firestore";

export const pagarCarrito = () => {
  return "Aun no se hace";
};

//RECIBE EL ID EL PRODUCTO AGREGADO AL CARRITO PARA PASARSELO AL REDUCER Y QUE LO ELIMINE.
export const quitarProducto = (id) => {
    return (dispatch) => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        })
    }
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


export const getProductos = () => {
  return async (dispatch) => {
    const allProducts = []
    const firebaseProducts = await getDocs(collection(db, "productos"));
    await firebaseProducts.forEach((doc) => {allProducts.push(doc.data())});
    console.log(allProducts)
    dispatch({
      type:   ADD_PRODUCTOS,
      payload: allProducts,
    });
  };
};
