//ejemplos de metodos de firebase
import { allAuth, allDb, auth, db, stor, allStor } from '../firebaseInicial/firebase';

const retorno = { mensaje: '', result: {}, confirma: false };

export const subirArchivo = async (archivoSeleccionado, idUsuario) => {
    if (archivoSeleccionado == null) return; 
    const extension = archivoSeleccionado.type.substring(6, archivoSeleccionado.type.length)
    const imageRef = allStor.ref(stor, `usuarios/avatars/${idUsuario}/avatar.${extension}`)
    await allStor.uploadBytes(imageRef, archivoSeleccionado).then(() => {
        console.log('primer then')
    }).catch(err => {
        console.log(err.message)
    })
};

export const mostrarImgen = async (pathArchivo) => {
    const imagenRef = allStor.ref(stor, pathArchivo)
    console.log(pathArchivo);
    let imagen = null 
    await allStor.listAll(imagenRef).then((res) => {
        res.items.forEach((item) => {
            allStor.getDownloadURL(item).then((url) => {
               imagen = url
               console.log(url);
                //setImageList((prev) => [...prev, url] )
            })
        });
    }).catch(err => {
        console.log(err.message)
    });
    return imagen
}

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

export const primeraLectura = async () => {
    const first = allDb.query(
        allDb.collection(db, "productos"),
        allDb.orderBy("nombre"),
        allDb.limit(2)

    );
    
    const documentSnapshots = await allDb.getDocs(first);
    
    const todo = documentSnapshots.docs;

    return {todo, documentSnapshots};

};

export const paginado = async () => {
    // aqui yo creo la consulta 
    const first = await allDb.query(
        allDb.collection(db, "productos"),
        allDb.orderBy("nombre"),
        allDb.limit(2)

    );
    //aqui yo ejecuto la consulta de frist 
    const documentSnapshots = await allDb.getDocs(first);
    //extraer los documentos de la consulta para desencriptarlos 
    const todo = await documentSnapshots.docs;
    //extrayendo el ultimo documento de la consulta y lo guardo en lastvisible 
    const lastVisible = await documentSnapshots.docs[
        documentSnapshots.docs.length - 1
    ];
    //extrayendo el primero documento de la consulta y lo guardo en fristvisible
    const fristVisible = await documentSnapshots.docs[
        documentSnapshots.docs.length - 2
    ];
    //crear la consulta empieza desde cierta parte hacia adelante 
    const next = await allDb.query(
        allDb.collection(db, "productos"),
        allDb.orderBy("nombre"),
        allDb.startAt(lastVisible),
        allDb.limit(2)
    );

    const document = await allDb.getDocs(next);
    const siguente = await document.docs;

    const lastVisible2 = await document.docs[
        document.docs.length - 1
    ];
    const fristVisible2 = await document.docs[
        document.docs.length - 2
    ];
    // crear la consulta empieza desde cierta parte hacia atras 
    const previus = await allDb.query(
        allDb.collection(db, "productos"),
        allDb.orderBy("nombre"),
        allDb.startAfter(fristVisible2),
        allDb.limit(2)
    );
    const document3 = await allDb.getDocs(previus);
    const anterior = await document3.docs;

    const lastVisible3 = await document3.docs[
        document3.docs.length - 1
    ];
    const fristVisible3 = await document3.docs[
        document3.docs.length - 2
    ];

    return { todo, anterior, siguente, lastVisible };
};