
import { useDispatch } from 'react-redux';
import { needVerificationAction, getUserById, loadingAction, uno } from './redux/actions/authAction';
import { useEffect } from 'react';
import { auth } from './firebaseInicial/firebase';
import { Route, Routes } from "react-router-dom";
import Layout from "./componets/pages/Layout";
import Home from "./componets/pages/Home";
import Registro from "./componets/pages/Registro";
import DetailProduct from "./componets/pages/DetailProduct";
import Generos from "./componets/pages/Generos";
import ProductoLista from "./componets/pages/ProductoLista";
import ProductoCreate from "./componets/pages/ProductoCreate";
import PerfilUS from "./componets/pages/PerfilU";
import PerfilAd from "./componets/pages/PerfilAd";
import InicioSesion from "./componets/pages/InicioSesion";
import AboutUs from "./componets/pages/AboutUs";
import Carrito from "./componets/pages/Carrito";
import ProductoDetalle from './componets/pages/ProductoDetalle';

function App() {

  const dispatch = useDispatch();

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
        <Route index element={<Home />} />
        <Route path="registro" element={<Registro />} />
        <Route path="detalleProducto" element={<DetailProduct />} />
        <Route path="registro" element={<Registro />} />
        <Route path="generos" element={<Generos />} />
        <Route path="producto_lista" element={<ProductoLista />} />
        <Route path="producto_create" element={<ProductoCreate />} />
        <Route path='producto_detalle/:id' element={<ProductoDetalle />} />
        <Route path="PerfilUsuario" element={<PerfilUS />} />
        <Route path="PerfilAdmin" element={<PerfilAd />} />
        <Route path="iniciarsesion" element={<InicioSesion />} />
        <Route path="AboutUs" element={<AboutUs />} />  
      </Route>
      <Route path="/carrito" element={<Carrito />} />
    </Routes>

  );
}

export default App;
