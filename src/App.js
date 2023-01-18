import { Route, Routes } from 'react-router-dom';
import Layout from './componets/pages/Layout';
import Home from './componets/pages/Home';
import Registro from './componets/pages/Registro';
import ProductoLista from './componets/pages/ProductoLista';
import ProductoCreate from './componets/pages/ProductoCreate';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='registro' element={<Registro />} />
        <Route path='producto_lista' element={<ProductoLista />} />
        <Route path='producto_create' element={<ProductoCreate />} />
      </Route>
    </Routes>
  );
}

export default App;
