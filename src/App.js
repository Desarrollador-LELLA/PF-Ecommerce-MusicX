import { useDispatch, useSelector } from 'react-redux';
import { needVerificationAction, getUserById, loadingAction } from './redux/actions/authAction';
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
import PerfilU from "./componets/pages/PerfilU";
import PerfilAd from './componets/pages/PerfilAd';
import Subirfoto from './componets/pages/Subirfoto';
import './css/app.css'
import TesterPaginado from './componets/pages/TesterPaginado';
import Bibloteca from './componets/pages/Bibloteca';
import SearchProduct from './componets/pages/SearchProduct';
import EditarP from './componets/pages/EditarP';
function App() {

  const dispatch = useDispatch();
  const { authenticatedAuth } = useSelector(state => state.auth);

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
        <Route index element={<Home />} />
        <Route path=":id" element={<DetailProduct />} />
        <Route path="AboutUs" element={<AboutUs />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path='SearchProduct' element={<SearchProduct/>}/>
        {/* CONDICIONALES CLIENTES */}
        <Route path="registro" element={!authenticatedAuth ? <Registro /> : <Navigate to="/" />} />
        <Route path="iniciarsesion" element={!authenticatedAuth ? <InicioSesion /> : <Navigate to="/" />} />
        <Route  path='Bibloteca'  element ={authenticatedAuth ? <Bibloteca/> : <Navigate to = "/iniciarsesion" />}/>
        <Route path="PerfilUsuario" element={authenticatedAuth ? <PerfilU /> : <Navigate to="/iniciarsesion" />} />
        {/* CONDICIONALES ADMIN */}
        <Route path="producto_create" element={authenticatedAuth ? <ProductoCreate /> : <Navigate to="/iniciarsesion" />} />
        <Route path="generos" element={authenticatedAuth ? <Generos /> : <Navigate to="/iniciarsesion" />} />
        <Route path="producto_lista" element={authenticatedAuth ? <ProductoLista /> : <Navigate to="/iniciarsesion" />} />
        <Route path='producto_detalle/:id' element={authenticatedAuth ? <ProductoDetalle /> : <Navigate to="/iniciarsesion" />} />
        <Route path='perfil' element={authenticatedAuth ? <Perfil /> : <Navigate to="/iniciarsesion" />} />
        {/* NO SE ESPESIFICA SI ES PUBLICA NI PRIVADA NI QUE COSA ES */}
        <Route path="subirfoto" element={<Subirfoto />} />
        <Route path="PerfilAdmin" element={authenticatedAuth ? <PerfilAd /> : <Navigate to="/iniciarsesion" />} />
        <Route path="testerpaginado" element={<TesterPaginado />} />
        {/* <Route path="testerpaginado/:pag" element={<TesterPaginado />} /> */}
        <Route path="editarUsuario/:id" element={<EditarP />} />
      </Route>



      
    </Routes>
  );
}

export default App;
