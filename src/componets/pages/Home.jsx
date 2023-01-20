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
};

export default Home;