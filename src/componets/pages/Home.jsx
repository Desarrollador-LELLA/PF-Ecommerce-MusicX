import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProductos } from '../../redux/actions/productoAction';

const Home = () => {
    
   
    const [productos,setProductos]=useState([]);

    const dispatch = useDispatch();
    const handleclick = async(event)=>{
        event.preventDefault();
        const askdf = await getProductos();
        console.log(askdf);
        setProductos(askdf)
    }
    
    return (
        <div>
            <h2>Aca Se Mostrarian Los Productos en Venta. Esta Ruta es Publica</h2>
            <h1>PROBANDO RPOBANDO</h1>
            
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