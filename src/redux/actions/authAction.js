import { allAuth, allDb, auth, db } from '../../firebaseInicial/firebase';
import { catchInicio } from '../../utils/InicioSesionErrors';
import { erroresList } from '../../utils/libreria';
import { unDocumento, whereDocumentos } from '../../utils/metodosFirebase';
import { AUTH_NEED_VERIFICATION, AUTH_SET_ERROR, AUTH_SET_LOADING, AUTH_SET_SUCCESS, AUTH_SET_USER, AUTH_SIGN_OUT } from '../types/authTypes';

// RESGISTRO DE USUARIOS
const registraAction = ({ nombre, apellido, correo, clave }, onError) => async (dispatch) => {
  try {
    const res = await allAuth.createUserWithEmailAndPassword(auth, correo, clave);
    if (res.user) {
      const userData = {
        id: res.user.uid,
        nombre,
        apellido,
        correo,
        rol: 'Cliente',
        imagen: '',
        fechaCreacion: allDb.serverTimestamp(),
      };
      await allDb.setDoc(allDb.doc(db, 'usuarios', res.user.uid), userData);
      await allAuth.sendEmailVerification(res.user);
      dispatch({
        type: AUTH_NEED_VERIFICATION,
      });
      dispatch({
        type: AUTH_SET_USER,
        payload: { id: userData.id, nombre, apellido, imagen: '', rol: 'Cliente' },
      });
    }
  } catch (err) {
    onError();
    dispatch({
      type: AUTH_SET_ERROR,
      payload: erroresList(err),
    });
  }
};

const registraGoogleAction = (onError) => async (dispatch) => {
  try {
    const provider = new allAuth.GoogleAuthProvider();
    const { _tokenResponse, user } = await allAuth.signInWithPopup(auth, provider)
    if (_tokenResponse.isNewUser) {
      const userData = {
        id: _tokenResponse.localId,
        nombre: _tokenResponse.firstName ? _tokenResponse.firstName : 'Sin Nombre',
        apellido: _tokenResponse.lastName ? _tokenResponse.lastName : 'Sin Apellido',
        correo: _tokenResponse.email,
        imagen: _tokenResponse.photoUrl,
        rol: 'Cliente',
        fechaCreacion: allDb.serverTimestamp(),
      };
      await allDb.setDoc(allDb.doc(db, 'usuarios', _tokenResponse.localId), userData);
      await allAuth.sendEmailVerification(user);
      dispatch({
        type: AUTH_NEED_VERIFICATION,
      });
      dispatch({
        type: AUTH_SET_USER,
        payload: { id: userData.id, nombre: userData.nombre, apellido: userData.apellido, imagen: userData.imagen, rol: 'Cliente' },
      });
    }
  } catch (err) {
    onError();
    dispatch({
      type: AUTH_SET_ERROR,
      payload: erroresList(err),
    });
  }
};

//INICIO DE SESION DE USUARIOS
const signInAction = ({ correo, contraseña }, onError) =>
  async (dispatch) => {
    try {
      await allAuth.signInWithEmailAndPassword(auth, correo, contraseña);
    } catch (err) {
      onError();
      dispatch({
        type: AUTH_SET_ERROR,
        payload: catchInicio(err)
      });

    }
  };

// SETEO DE ERRORES ENVIADAS DESDE FIREBASE O ERRORES CREDOS
const errorAction = (msg) => (dispatch) => {
  dispatch({
    type: AUTH_SET_ERROR,
    payload: msg,
  });
};

// SETEO DE CORREO DE VERIFICACION DEL USUARIO
const needVerificationAction = () => (dispatch) => {
  dispatch({
    type: AUTH_NEED_VERIFICATION,

  });
};

// SETEO DE LOADING O CARGA DE PROCESOS
const loadingAction = (valueBoleano) => {
  return {
    type: AUTH_SET_LOADING,
    payload: valueBoleano,
  };
};

// SETEO LOS MENSAJES SUCCESS
const successAction = (msg) => (dispatch) => {
  dispatch({
    type: AUTH_SET_SUCCESS,
    payload: msg,
  });
};

// ACTION QUE TRAE AL USUARIO POR SU ID
const getUserById = (id) => async (dispatch) => {
  try {
    const docRef = allDb.doc(db, 'usuarios', id);
    const user = await allDb.getDoc(docRef);
    if (user.exists()) {
      dispatch({
        type: AUTH_SET_USER,
        payload: user.data(),
      });
    } else {
    }
  } catch (err) {

  } finally {
    dispatch({
      type: AUTH_SET_LOADING,
      payload: false,
    });
  }
};

const buscarSesionIniciada = () => (dispatch) => {

}

// Log out
const signOutAction = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingAction(true));
      await auth.signOut();
      dispatch({
        type: AUTH_SIGN_OUT,
      });
    } catch (err) {
      dispatch(loadingAction(false));
    }
  };
};

// Send password reset email
// const sendPasswordResetEmail = ({ correo }, successMsg) => {
//   return async (dispatch) => {
//     try {
//       await allAuth.sendPasswordResetEmail(auth, correo);
//       dispatch(setSuccess(successMsg));
//     } catch (err) {
//       dispatch(setError(err.message));
//     }
//   };
// };

// const getUserPerfil = ({ id }, loading) => async (dispatch) => {
//   try {
//     const docRef = allDb.doc(db, 'usuarios', id);
//     const user = await allDb.getDoc(docRef);
//     if (user.exists()) {
//       //const userData = user.data() as User;
//       const userData = {
//         rut: user.get('rut') ? user.get('rut') : '',
//         pnombre: user.get('pnombre'),
//         papellido: user.get('papellido'),
//         correo: user.get('correo'),
//         telefono: user.get('telefono'),
//         promos: user.get('promos') ? user.get('promos') : '',
//       };
//       loading(userData);
//     }
//   } catch (err) {
//     loading({});
//     dispatch(setError(err.message));
//   }
// };

// const addUserDireccion = (
//   id,
//   { nombre, direccion, numero, block, dep, info },
//   loading
// ) => {
//   return async (dispatch) => {
//     try {
//       dispatch(setError('err.message'));
//       const direccionRef = allDb.doc(db, 'usuarios', id);
//       const direccionData = {
//         direcciones: allDb.arrayUnion({
//           nombre: nombre,
//           direccion: direccion,
//           numero: numero,
//           block: block,
//           dep: dep,
//           info: info,
//         }),
//       };
//       await allDb.updateDoc(direccionRef, direccionData);
//       loading();
//     } catch (err) {
//       loading();
//       dispatch(setError(err.message));
//     }
//   };
// };

export {
  registraAction,
  errorAction,
  needVerificationAction,
  loadingAction,
  successAction,
  signInAction,
  signOutAction,
  getUserById,
  registraGoogleAction
};
