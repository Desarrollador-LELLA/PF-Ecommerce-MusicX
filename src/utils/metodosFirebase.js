//ejemplos de metodos de firebase
import {
  allAuth,
  allDb,
  auth,
  db,
  stor,
  allStor,
} from "../firebaseInicial/firebase";

const retorno = { mensaje: "", result: {}, confirma: false };

export const subirArchivo = async (archivoSeleccionado, idUsuario) => {
  if (archivoSeleccionado == null) return;
  let imagen = null;
  const extension = archivoSeleccionado.type.substring(
    6,
    archivoSeleccionado.type.length
  );
  const imageRef = allStor.ref(
    stor,
    `usuarios/avatars/${idUsuario}/avatar.${extension}`
  );
  await allStor
    .uploadBytes(imageRef, archivoSeleccionado)
    .then(async (data) => {
      imagen = await mostrarImgen(
        `usuarios/avatars/${idUsuario}/avatar.${extension}`
      );
    })
    .catch((err) => {
      console.log(err.message);
    });
  return imagen;
};

export const subirArchivoMetodo = async (ruta, archivo, pasoFinal) => {
  if (archivo == null) return;
  const imageRef = allStor.ref(stor, ruta);
  await allStor
    .uploadBytes(imageRef, archivo)
    .then(async (data) => {
      const imagen = await mostrarImgen(ruta);
      pasoFinal(imagen);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const mostrarImgen = async (pathArchivo) => {
  const imagenRef = allStor.ref(stor, pathArchivo);
  let imagen = null;

  await allStor
    .getDownloadURL(imagenRef)
    .then((url) => {
      imagen = url;
      //setImageList((prev) => [...prev, url] )
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
  return imagen;
};

/**
 * Este metodo consulta y trae 1 documento en espesifico el cual necesita una coleccion y un id del documento a consultar
 *
 * Ejemplo: const r = unDocumento('usuarios', 'iddelcoumento')
 *
 * retorna { mensaje: 'string mensaje', result: {}, confirma: false o true }
 *
 * @by Don Toulon
 */
export const unDocumento = async (nombreCollecion, id) => {
  try {
    const docRef = allDb.doc(db, nombreCollecion, id);
    const docSnap = await allDb.getDoc(docRef);
    if (docSnap.exists()) {
      retorno.result = docSnap.data();
      retorno.result.id = docSnap.id;
      retorno.confirma = true;
      retorno.mensaje = "Consulta Exitosa";
    } else {
      retorno.result = docSnap;
      retorno.mensaje =
        "La Consulta fue exitosa pero esta no encontro lo que buscabas";
    }
  } catch (error) {
    retorno.mensaje = error.message;
  } finally {
    return retorno;
  }
};
export const unDocumentoCallback = async (
  nombreCollecion,
  id,
  funcionCallback
) => {
  try {
    const docRef = allDb.doc(db, nombreCollecion, id);
    const docSnap = await allDb.getDoc(docRef);
    if (docSnap.exists()) {
      retorno.result = docSnap.data();
      retorno.result.id = docSnap.id;
      retorno.confirma = true;
      retorno.mensaje = "Consulta Exitosa";
    } else {
      retorno.result = docSnap;
      retorno.mensaje =
        "La Consulta fue exitosa pero esta no encontro lo que buscabas";
    }
  } catch (error) {
    retorno.mensaje = error.message;
  } finally {
    funcionCallback(retorno);
  }
};

/**
 * Este metodo consulta y trae varios documento en espesifico el cual necesita una coleccion y una clausula where de los attibutos que necesita comparar.
 *
 * e.g "<", "<=", "==", "<", "<=", "!="
 *
 * Ejemplo: const r = whereDocumentos('usuarios', {'nombre', '!=', 'pene'})
 *
 * retorna { mensaje: 'string mensaje', result: [], confirma: false o true }
 *
 * @by Don Toulon
 */
export const whereDocumentos = async (
  nombreCollecion,
  { fieldPath, opStr, value }
) => {
  try {
    const arrays = [];
    const q = allDb.query(
      allDb.collection(db, nombreCollecion),
      allDb.where(fieldPath, opStr, value)
    );
    const querySnapshot = await allDb.getDocs(q);
    querySnapshot.forEach((doc) => {
      const item = doc.data();
      item.id = doc.id;
      arrays.push(item);
    });
    retorno.result = arrays;
    retorno.confirma = true;
    retorno.mensaje = "Consulta Exitosa";
  } catch (error) {
    retorno.result = [];
    retorno.mensaje = error.message;
  } finally {
    return retorno;
  }
};

/**
 * Este metodo crea un documento y retorna el id
 *
 * Ejemplo: const r = crearDocumento('usuarios', { data: objeto a crear })
 *
 * retorna { mensaje: 'string mensaje', result: {}, confirma: false o true }
 *
 * @by Don Toulon
 */
export const crearDocumento = async (nombreCollecion, { data }) => {
  try {
    const docRef = await allDb.addDoc(
      allDb.collection(db, nombreCollecion),
      data
    );
    retorno.result.id = docRef.id;
    retorno.confirma = true;
    retorno.mensaje = "Consulta Exitosa";
  } catch (error) {
    retorno.mensaje = error.message;
  } finally {
    return retorno;
  }
};

/**
 * Este metodo actualiza un documento
 *
 * Ejemplo: const r = crearDocumento('usuarios', 'id', { data: objeto a actualizar })
 *
 * retorna { mensaje: 'string mensaje', result: {}, confirma: false o true }
 *
 * @by Don Toulon
 */
export const actualizaDocumento = async (nombreCollecion, id, { data }) => {
  try {
    const docRef = allDb.doc(db, nombreCollecion, id);
    const r = await allDb.updateDoc(docRef, data);

    retorno.result.id = "docRef.id";
    retorno.confirma = true;
    retorno.mensaje = "Consulta Exitosa";
  } catch (error) {
    retorno.mensaje = error.message;
  } finally {
    return retorno;
  }
};
export const actualizaDocumentoArray = async (nombreCollecion, id, { data }) => {
    try {
        const docRef = allDb.doc(db, nombreCollecion, id);
        const r = await allDb.updateDoc(docRef, data);

        retorno.result.id = 'docRef.id';
        retorno.confirma = true;
        retorno.mensaje = 'Consulta Exitosa';
    } catch (error) {
        retorno.mensaje = error.message;
    } finally {
        return retorno;
    }
};

/**
 * Este metodo consulta y trae varios documento en espesifico el cual necesita una coleccion y una clausula where de los attibutos que necesita comparar.
 *
 * e.g "<", "<=", "==", "<", "<=", "!="
 *
 * Ejemplo: const r = whereDocumentos('usuarios', {'nombre', '!=', 'pene'})
 *
 * retorna { mensaje: 'string mensaje', result: [], confirma: false o true }
 *
 * @by Don Toulon
 */
export const todosDocumentos = async (
  nombreCollecion,
  orderBy,
  whereFiltros,
  loading
) => {
  try {
    const arrays = [];
    let q = null;
    if (whereFiltros) {
      q = allDb.query(
        allDb.collection(db, nombreCollecion),
        allDb.orderBy(orderBy),
        allDb.where(whereFiltros)
      );
    } else {
      q = allDb.query(
        allDb.collection(db, nombreCollecion),
        allDb.orderBy(orderBy)
      );
    }

    const querySnapshot = await allDb.getDocs(q);
    querySnapshot.forEach((doc) => {
      const item = doc.data();
      item.id = doc.id;
      arrays.push(item);
    });

    retorno.result = arrays;
    retorno.confirma = true;
    retorno.mensaje = "Consulta Exitosa";
  } catch (error) {
    retorno.result = [];
    retorno.mensaje = error.message;
  } finally {
    loading();
    return retorno;
  }
};

export const PasswordChange = async (newPassword, resultado) => {
  const user = auth.currentUser;
  await allAuth.updatePassword(user, newPassword)
    .then(() => {
        retorno.result = [];
        retorno.confirma = true;
        retorno.mensaje = "Cambio de contraseña exitoso";
        resultado(retorno)
    })
    .catch((error) => {
        retorno.result = [];
        retorno.mensaje = error.message;
        resultado(retorno)
    });
};

// EL PAGINADO ME LA MAMA
// export const paginasPaginado = async (coleccion, orderBy, whereFiltros) => {
//     let totalDatos = null;
//     if (whereFiltros) {
//         totalDatos = allDb.query(
//             allDb.collection(db, coleccion),
//             allDb.orderBy(orderBy),
//             allDb.where(whereFiltros)
//         );
//     } else {
//         totalDatos = allDb.query(
//             allDb.collection(db, coleccion),
//             allDb.orderBy(orderBy)
//         );
//     }

//     const documentSnapshots = await allDb.getDocs(totalDatos);
//     const total = documentSnapshots.size;

//     return {
//         totalItems: total,
//         paginas: Math.ceil(total / 3)
//     };
// };

// export const obtienePaginado = async (coleccion, orderBy, whereFiltros) => {

//     const lista = [];
//     let primera = null;
//     if (whereFiltros) {
//         primera = allDb.query(
//             allDb.collection(db, coleccion),
//             allDb.orderBy(orderBy),
//             allDb.where(whereFiltros),
//             allDb.limit(3)
//         );
//     } else {
//         primera = allDb.query(
//             allDb.collection(db, coleccion),
//             allDb.orderBy(orderBy),
//             allDb.limit(3)
//         );
//     }

//     const numPaginas = await paginasPaginado(coleccion, orderBy, whereFiltros);
//     const documentSnapshots = await allDb.getDocs(primera);
//     const ultimaVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1] || null;
//     const primeraVisible = documentSnapshots.docs[0] || null;

//     documentSnapshots.forEach((doc) => {
//         let linea = doc.data();
//         linea.id = doc.id;
//         lista.push(linea);
//     });

//     return {
//         ultimaVisible,
//         primeraVisible,
//         lista,
//         numPaginas
//     };
// };

// export const siguientePaginado = async (coleccion, orderBy, uVisible, whereFiltros) => {

//     const lista = [];
//     let next = null;
//     if (whereFiltros) {
//         next = allDb.query(
//             allDb.collection(db, coleccion),
//             allDb.orderBy(orderBy),
//             allDb.where(whereFiltros),
//             allDb.limit(3),
//             allDb.startAfter(uVisible)
//         );
//     } else {
//         next = allDb.query(
//             allDb.collection(db, coleccion),
//             allDb.orderBy(orderBy),
//             allDb.limit(3),
//             allDb.startAfter(uVisible)
//         );
//     }

//     const documentSnapshots = await allDb.getDocs(next);
//     const ultimaVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1] || null;
//     const primeraVisible = documentSnapshots.docs[0] || null;

//     documentSnapshots.forEach((doc) => {
//         let linea = doc.data();
//         linea.id = doc.id;
//         lista.push(linea);
//     });

//     return {
//         ultimaVisible,
//         primeraVisible,
//         lista
//     };
// };

// export const anteriorPaginado = async (coleccion, orderBy, pVisible, whereFiltros) => {

//     const lista = [];
//     let back = null;
//     if (whereFiltros) {
//         back = allDb.query(
//             allDb.collection(db, coleccion),
//             allDb.orderBy(orderBy),
//             allDb.where(whereFiltros),
//             allDb.limit(3),
//             allDb.endBefore(pVisible)
//         );
//     } else {
//         back = allDb.query(
//             allDb.collection(db, coleccion),
//             allDb.orderBy(orderBy),
//             allDb.limit(3),
//             allDb.endBefore(pVisible)
//         );
//     };

//     const documentSnapshots = await allDb.getDocs(back);
//     const ultimaVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1] || null;
//     const primeraVisible = documentSnapshots.docs[0] || null;

//     documentSnapshots.forEach((doc) => {
//         let linea = doc.data();
//         linea.id = doc.id;
//         lista.push(linea);
//     });

//     return {
//         ultimaVisible,
//         primeraVisible,
//         lista
//     };
// };

// export const obtenerPaginas = async (coleccion, orderBy, whereFiltros) => {
//     let totalDatos = null;
//     if (whereFiltros) {
//         totalDatos = allDb.query(
//             allDb.collection(db, coleccion),
//             allDb.orderBy(orderBy),
//             allDb.where(whereFiltros)
//         );
//     } else {
//         totalDatos = allDb.query(
//             allDb.collection(db, coleccion),
//             allDb.orderBy(orderBy)
//         );
//     }

//     const documentSnapshots = await allDb.getDocs(totalDatos);
//     const total = documentSnapshots.size;

//     return {
//         totalItems: total
//     };
// };

// export const inicialPaginado = async (coleccion, orderBy, whereFiltros, limite) => {

//     const lista = [];
//     let primera = null;
//     if (whereFiltros) {
//         primera = allDb.query(
//             allDb.collection(db, coleccion),
//             allDb.orderBy(orderBy),
//             allDb.where(whereFiltros),
//             allDb.limit(limite)
//         );
//     } else {
//         primera = allDb.query(
//             allDb.collection(db, coleccion),
//             allDb.orderBy(orderBy),
//             allDb.limit(limite)
//         );
//     }

//     const numPaginas = await paginasPaginado(coleccion, orderBy, whereFiltros);
//     const documentSnapshots = await allDb.getDocs(primera);

//     documentSnapshots.forEach((doc) => {
//         let linea = doc.data();
//         linea.id = doc.id;
//         lista.push(linea);
//     });

//     return {
//         lista,
//         numPaginas
//     };
// };

// export const cambiaPaginado = async (coleccion, orderBy, uVisible, whereFiltros, limite) => {

//     const numPaginas = await paginasPaginado(coleccion, orderBy, whereFiltros);
//     const lista = [];
//     let next = null;
//     if (whereFiltros) {
//         next = allDb.query(
//             allDb.collection(db, coleccion),
//             allDb.orderBy(orderBy),
//             allDb.where(whereFiltros),
//             allDb.limit(limite),
//             allDb.startAfter(uVisible)
//         );
//     } else {
//         next = allDb.query(
//             allDb.collection(db, coleccion),
//             allDb.orderBy(orderBy),
//             allDb.limit(limite),
//             allDb.startAfter(uVisible)
//         );
//     }

//     const documentSnapshots = await allDb.getDocs(next);

//     documentSnapshots.forEach((doc) => {
//         let linea = doc.data();
//         linea.id = doc.id;
//         lista.push(linea);
//     });

//     return {
//         lista,
//         numPaginas
//     };
// };
