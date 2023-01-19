import ProductCards from "../com/ProductCards";
import TopBeats from "../com/TopBeats";
import React, { useEffect, useState } from 'react';
import { getProductos } from '../../redux/actions/productoAction';

const Home = () => {
  return (
    <div>
        <h1>TOP BEATS!</h1>
      <TopBeats/>
      <ProductCards/>

    </div>
  );
};

export default Home;
