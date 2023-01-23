//ejemplos de metodos de firebase
import { allAuth, allDb, auth, db } from '../firebaseInicial/firebase';

const retorno = { mensaje: '', result: {}, confirma: false };

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