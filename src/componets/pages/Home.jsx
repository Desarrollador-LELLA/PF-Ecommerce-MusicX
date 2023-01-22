import ProductCards from "../com/ProductCards";
import TopBeats from "../com/TopBeats";
import s from "../../css/Home.module.css";
import Paginate from "../com/Paginate";
import { LimpiarDetalleProd } from "../../redux/actions/carritoAction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LimpiarDetalleProd);
  });
  return (
    <div className={s.contendor}>
      <p className={s.topbeats}>
        <span data-text="T">T</span>
        <span data-text="O">O</span>
        <span data-text="P">P</span>
        <span data-text="-">-</span>
        <span data-text="B">B</span>
        <span data-text="E">E</span>
        <span data-text="A">A</span>
        <span data-text="T">T</span>
        <span data-text="S">S</span>
        <span data-text="!">!</span>
      </p>
      <TopBeats />
      <ProductCards />
      <Paginate></Paginate>
    </div>
  );
};

export default Home;
