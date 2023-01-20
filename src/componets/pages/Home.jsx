import ProductCards from "../com/ProductCards";
import TopBeats from "../com/TopBeats";
import React, { useEffect, useState } from "react";
import { getProductos } from "../../redux/actions/productoAction";
import s from "../../css/Home.module.css";

const Home = () => {
  return (
    <div>
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
      <ProductCards/>
    </div>
  );
};

export default Home;
