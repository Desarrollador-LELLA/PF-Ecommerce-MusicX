import { Route, Routes } from "react-router-dom";
import Layout from "./componets/pages/Layout";
import Home from "./componets/pages/Home";
import Registro from "./componets/pages/Registro";
import DetailProduct from "./componets/pages/DetailProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="registro" element={<Registro />} />
        <Route path="detalleProducto" element={<DetailProduct />} />
      </Route>
    </Routes>
  );
}

export default App;
