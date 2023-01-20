import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProductos , getTeste } from '../../redux/actions/productoAction';
import Paginate from '../com/Paginate';

const Home = () => {
    
   
    const [productos,setProductos]=useState([]);

    const dispatch = useDispatch();
    const handleclick = async(event)=>{
        event.preventDefault();
        const askdf = await getProductos();
        setProductos(askdf)
    }
    
    return (
        <div>
            <h2>Aca Se Mostrarian Los Productos en Venta. Esta Ruta es Publica</h2>
            <h1>PROBANDO RPOBANDO</h1>
            <Paginate></Paginate>
            <button onClick={handleclick} >xd</button>
           {productos?.map((ele)=>
                (
                 <span key={ele.data().nombre}>{ele.data().nombre}</span>
                )
            )

            }
        </div>
    );
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
