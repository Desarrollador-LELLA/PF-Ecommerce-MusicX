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
    const name = userData.data().nombre;
    await fetch('https://api.sendinblue.com/v3/smtp/email', {
      method: 'POST',
      body: JSON.stringify({
        "sender": {
          "name": "Orion MusicX",
          "email": "musicx.orion@gmail.com"
        },
        "to": [
          {
            "email": correo,
            "name": name
          }
        ],
        "subject": "Tu compra se ha realizado con exito!",
          "htmlContent": "<html><head></head><body><p>Saludos de parte del equipo de Orion MusicX</p>Te agradecemos mucho por adquirir nuestros productos.<br><br>Ahora podras disfrutar de nuestra musica, recuerda que hay licencias que te otorgan ciertos beneficios!.<br>No olvides mirar mas de nuestra variedad de productos donde puedes encontrar infinidad de beats para lo que desees.<br>Esperamos a ver sido complacientes, y esperamos volverte a ofrecer nuestros servicios.<br><br>Puedes mirar tus compras en tu <a href='https://orion-proyect.web.app/bibloteca'>biblioteca</a> y descomprimir el archivo con esta clave O03r35i15O09n87M45u15s57i17c06X666.</p><p>Gracias.<br>Orion MusicX S.A</p></body></html>"
      }),
      headers: {
        'accept': 'application/json',
        'api-key': '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',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then(data => {
        console.log('--------------------------------DATA -------------------------------------', data);
      })
      .catch(console.log);

    dispatch({
      type: ENVIAR_CORREO,
    });
  };
};      
