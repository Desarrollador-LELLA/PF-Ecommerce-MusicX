import {
  ELIMINAR_PRODUCTO,
  ENVIAR_CORREO,
  DETALLE_UN_PRODUCTO,
  ADD_PRODUCTOS,
  ADD_PRODUCTO,
  LIMPIAR_PRODUCTO_DETALLE,
  ADD_BIBLIOTECA,
  LIMPIAR_DETALLE_CARRITO,
} from "../types/carritoTypes.js";

import { allDb, db } from "../../firebaseInicial/firebase";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

//RECIBE EL ID EL PRODUCTO AGREGADO AL CARRITO PARA PASARSELO AL REDUCER Y QUE LO ELIMINE.
export const quitarProducto = (id, licencia) => {
  return (dispatch) => {
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: {
        id,
        licencia,
      },
    });
  };
};

export const getProducto = (id, audio) => {
  return async (dispatch) => {
    const docRef = allDb.doc(db, "productos", `${id}`);
    const docSnap = await allDb.getDoc(docRef);
    dispatch({
      type: DETALLE_UN_PRODUCTO,
      payload: { ...docSnap.data(), id: docSnap.id },
    });
    audio(true);
  };
};

export const getProductos = () => {
  return async (dispatch) => {
    const allProducts = [];
    const firebaseProducts = await getDocs(collection(db, "productos"));
    await firebaseProducts.forEach((doc) => {
      allProducts.push({ ...doc.data(), id: doc.id });
    });
    console.log(allProducts);
    dispatch({
      type: ADD_PRODUCTOS,
      payload: allProducts,
    });
  };
};

export const addProducto = (producto) => {
  return {
    type: ADD_PRODUCTO,
    payload: {
      producto,
    },
  };
};

export const LimpiarDetalleProd = () => {
  return {
    type: LIMPIAR_PRODUCTO_DETALLE,
    payload: {},
  };
};

export const LimpiarDetalleCarrito = () => {
  return {
    type: LIMPIAR_DETALLE_CARRITO,
    payload: {},
  };
};

export const addBiblioteca = (productos, idUser) => {
  return async (dispatch) => {
    const usuario = allDb.doc(db, "usuarios", idUser);
    const userData = await allDb.getDoc(usuario);
    const bibliotecaPrev = userData.data().biblioteca;

    if (!userData.data().biblioteca) {
      await setDoc(usuario, { ...userData.data(), biblioteca: [] });
      await updateDoc(usuario, { biblioteca: [...productos] });
    } else {
      await updateDoc(usuario, {
        biblioteca: [...bibliotecaPrev, ...productos],
      });
    }
    dispatch({
      type: ADD_BIBLIOTECA,
    });
  };
};

export const enviarCorreo = (idUser) => {
  return async (dispatch) => {
    const usuario = doc(db, "usuarios", idUser);
    const userData = await allDb.getDoc(usuario);
    const correo = userData.data().correo;

    dispatch({
      type: ENVIAR_CORREO,
    });
  };
};
