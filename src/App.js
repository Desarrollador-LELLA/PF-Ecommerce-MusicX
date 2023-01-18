import { Route, Routes } from 'react-router-dom';
import Layout from './componets/pages/Layout';
import Home from './componets/pages/Home';
import Registro from './componets/pages/Registro';
import ProductoLista from './componets/pages/ProductoLista';
import ProductoCreate from './componets/pages/ProductoCreate';
import PerfilUS from './componets/pages/PerfilU';
import PerfilAd from './componets/pages/PerfilAd'
import InicioSesion from './componets/pages/InicioSesion';
import AboutUs from './componets/pages/AboutUs';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='registro' element={<Registro />} />
        <Route path='producto_lista' element={<ProductoLista />} />
        <Route path='producto_create' element={<ProductoCreate />} />
        <Route path='PerfilUsuario' element={<PerfilUS />} />
        <Route path='PerfilAdmin' element={<PerfilAd />} />
        <Route path="iniciarsesion" element={<InicioSesion/>}/>
        <Route path= 'AboutUs' element ={<AboutUs/>}/>
      </Route>
    </Routes>
    
  );
}

export default App;
