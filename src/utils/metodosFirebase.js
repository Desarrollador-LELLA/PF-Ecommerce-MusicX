//ejemplos de metodos de firebase
import { allAuth, allDb, auth, db, allStor, stor } from '../firebaseInicial/firebase';

const retorno = { mensaje: '', result: {}, confirma: false };

export const mostrarImgen = (pathArchivo) => {
    const imagenRef = allStor.ref(stor, pathArchivo);
    allStor.listAll(imagenRef).then((res) => {
        res.items.forEach((item) => {
            allStor.getDownloadURL(item).then((url) => {
                //setImageList((prev) => [...prev, url] )
            });
        });
    }).catch(err => {
        console.log(err.message);
    });
};

const subirArchivo = async (archivoSeleccionado, idUsuario) => {
    if (archivoSeleccionado == null) return;
    const imageRef = allStor.ref(stor, `avatar/${idUsuario}/${archivoSeleccionado.name}`);
    await allStor.uploadBytes(imageRef, archivoSeleccionado).then(() => {
        console.log('primer then');
    }).catch(err => {
        console.log(err.message);
    });
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
            retorno.mensaje = 'Consulta Exitosa';
        } else {
            retorno.result = docSnap;
            retorno.mensaje = 'La Consulta fue exitosa pero esta no encontro lo que buscabas';
        }
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
export const whereDocumentos = async (nombreCollecion, { fieldPath, opStr, value }) => {
    try {
        const arrays = [];
        const q = allDb.query(allDb.collection(db, nombreCollecion), allDb.where(fieldPath, opStr, value));
        const querySnapshot = await allDb.getDocs(q);
        querySnapshot.forEach((doc) => {
            const item = doc.data();
            item.id = doc.id;
            arrays.push(item);
        });
        retorno.result = arrays;
        retorno.confirma = true;
        retorno.mensaje = 'Consulta Exitosa';
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
        const docRef = await allDb.addDoc(allDb.collection(db, nombreCollecion), data);
        retorno.result.id = docRef.id;
        retorno.confirma = true;
        retorno.mensaje = 'Consulta Exitosa';
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
export const todosDocumentos = async (nombreCollecion) => {
    try {
        const arrays = [];
        const q = allDb.query(allDb.collection(db, nombreCollecion));
        const querySnapshot = await allDb.getDocs(q);
        querySnapshot.forEach((doc) => {
            const item = doc.data();
            item.id = doc.id;
            arrays.push(item);
        });
        retorno.result = arrays;
        retorno.confirma = true;
        retorno.mensaje = 'Consulta Exitosa';
    } catch (error) {
        retorno.result = [];
        retorno.mensaje = error.message;
    } finally {
        return retorno;
    }
};

export const paginasPaginado = async (coleccion, orderBy) => {
    const totalDatos = allDb.query(
        allDb.collection(db, coleccion),
        allDb.orderBy(orderBy)
    );
    const documentSnapshots = await allDb.getDocs(totalDatos);
    const total = documentSnapshots.size;

    return {
        totalItems: total,
        paginas: Math.ceil(total / 3)
    };
};

export const obtienePaginado = async (coleccion, orderBy) => {

    const lista = [];
    const primera = allDb.query(
        allDb.collection(db, coleccion),
        allDb.orderBy(orderBy),
        allDb.limit(3)
    );
    const numPaginas = await paginasPaginado(coleccion, orderBy);
    const documentSnapshots = await allDb.getDocs(primera);
    const ultimaVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1] || null;
    const primeraVisible = documentSnapshots.docs[0] || null;

    documentSnapshots.forEach((doc) => {
        let linea = doc.data();
        linea.id = doc.id;
        lista.push(linea);
    });

    return {
        ultimaVisible,
        primeraVisible,
        lista,
        numPaginas
    };
};

export const siguientePaginado = async (coleccion, orderBy, uVisible) => {

    const lista = [];
    const next = allDb.query(
        allDb.collection(db, coleccion),
        allDb.orderBy(orderBy),
        allDb.limit(3),
        allDb.startAfter(uVisible)
    );
    const documentSnapshots = await allDb.getDocs(next);
    const ultimaVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1] || null;
    const primeraVisible = documentSnapshots.docs[0] || null;

    documentSnapshots.forEach((doc) => {
        let linea = doc.data();
        linea.id = doc.id;
        lista.push(linea);
    });

    return {
        ultimaVisible,
        primeraVisible,
        lista
    };
};

export const anteriorPaginado = async (coleccion, orderBy, pVisible) => {
    const lista = [];
    const back = allDb.query(
        allDb.collection(db, coleccion),
        allDb.orderBy(orderBy),
        allDb.limitToLast(3),
        allDb.endBefore(pVisible)
    );

    const documentSnapshots = await allDb.getDocs(back);
    const ultimaVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1] || null;
    const primeraVisible = documentSnapshots.docs[0] || null;

    documentSnapshots.forEach((doc) => {
        let linea = doc.data();
        linea.id = doc.id;
        lista.push(linea);
    });

    return {
        ultimaVisible,
        primeraVisible,
        lista
    };
};
