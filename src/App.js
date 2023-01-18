import { Route, Routes } from 'react-router-dom';
import Layout from './componets/pages/Layout';
import Home from './componets/pages/Home';
import Registro from './componets/pages/Registro';
import PerfilUS from './componets/pages/PerfilU';
import PerfilAd from './componets/pages/PerfilAd'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='registro' element={<Registro />} />
        <Route path='PerfilUsuario' element={<PerfilUS />} />
        <Route path='PerfilAdmin' element={<PerfilAd />} />
      </Route>
    </Routes>
  );
}

export default App;
