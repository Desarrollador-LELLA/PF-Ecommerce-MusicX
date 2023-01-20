import { Route, Routes } from "react-router-dom";
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


function App() {
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
        <Route path='perfil' element={<Perfil />} />
        <Route path="iniciarsesion" element={<InicioSesion />} />
        <Route path="AboutUs" element={<AboutUs />} />  

      </Route>
      <Route path="/carrito" element={<Carrito />} />
    </Routes>
    
  );
}

export default App;
