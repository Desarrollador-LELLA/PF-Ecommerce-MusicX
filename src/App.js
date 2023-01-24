import { useDispatch, useSelector } from 'react-redux';
import { needVerificationAction, getUserById, loadingAction, uno } from './redux/actions/authAction';
import { useEffect } from 'react';
import { auth } from './firebaseInicial/firebase';
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./componets/pages/Layout";
import Home from "./componets/pages/Home";
import Registro from "./componets/pages/Registro";
import DetailProduct from "./componets/pages/DetailProduct";
import Generos from "./componets/pages/Generos";
import ProductoLista from "./componets/pages/ProductoLista";
import ProductoCreate from "./componets/pages/ProductoCreate";
import Perfil from "./componets/pages/Perfil";
import InicioSesion from "./componets/pages/InicioSesion";
import AboutUs from "./componets/pages/AboutUs";
import Carrito from "./componets/pages/Carrito";
import ProductoDetalle from './componets/pages/ProductoDetalle';
import PerfilU from "./componets/pages/PerfilU"
import PerfilAd from './componets/pages/PerfilAd';
import Bibloteca from './componets/pages/Bibloteca';

function App() {

  const dispatch = useDispatch();
  const { authenticatedAuth } = useSelector(state => state.auth)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(loadingAction(true));
      if (user) {
        dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(needVerificationAction());
        }
      } else {
        dispatch(loadingAction(false));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        {/* SIN AUTORIZACION */}
        <Route path=":id" element={<DetailProduct />} />
        <Route index element={<Home />} />
        <Route path="AboutUs" element={<AboutUs />} />  
        {/* CONDICIONALES CLIENTES */}
        <Route path="registro" element={!authenticatedAuth ? <Registro /> : <Navigate to="/" />} /> 
        <Route path="iniciarsesion" element={!authenticatedAuth ? <InicioSesion /> : <Navigate to="/" />} />
        <Route path="PerfilUsuario" element={authenticatedAuth ? <PerfilU /> : <Navigate to= "/" />} />
        <Route  path='Bibloteca'  element ={authenticatedAuth ? <Bibloteca/> : <Navigate to = "/iniciarsesion" />}/>
        {/* CONDICIONALES ADMIN*/}
        <Route path="producto_create" element={authenticatedAuth ? <ProductoCreate /> : <Navigate to="/" />} />
        <Route path="PerfilAdmin" element={authenticatedAuth ? <PerfilAd /> : <Navigate to="/" />} />
        <Route path="generos" element={authenticatedAuth ? <Generos /> : <Navigate to="/" />} />
        {/* NO SE ESPESIFICA SI ES PUBLICA NI PRIVADA NI QUE COSA ES */}
        <Route path="producto_lista" element={<ProductoLista />} />
        <Route path='producto_detalle/:id' element={<ProductoDetalle />} />
        <Route path='perfil' element={<Perfil />} />
        <Route path="iniciarsesion" element={<InicioSesion />} />
        <Route path="AboutUs" element={<AboutUs />} />  

      </Route>
      <Route path="/carrito" element={<Carrito />} />
    </Routes>
  );
}

export default App;
