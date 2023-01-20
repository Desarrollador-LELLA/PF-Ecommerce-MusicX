import {Link} from "react-router-dom";
import {db} from "../../firebaseInicial/firebase";
import { collection, getDocs } from "firebase/firestore";
import styleCarrito from "../../css/Carrito.module.css";

const Carrito = () => {
    const initialValue = 0;

    const productos = [{
        autor: "Orion",
        descripcion:"aklsdgklaklgmladg",
        imagen:"https://firebasestorage.googleapis.com/v0/b/orion-proyect.appspot.com/o/Iconos%2FSin%20t%C3%ADtulo-2.png?alt=media&token=1df74b69-94a5-4fe4-b269-bc5d44fa52be",
        key: "key 3",
        nombre:"xd",
        precio:3.9,
        tiempo:"155"
    }, {
        autor: "Yo papi",
        descripcion: "Informacion de musica 1",
        deshabilitado: true,
        imagen: "https://firebasestorage.googleapis.com/v0/b/orion-proyect.appspot.com/o/Iconos%2FSin%20t%C3%ADtulo-3.png?alt=media&token=a08abb3c-c35c-457f-bf7a-f99e6166beba",
        key: "Key 1",
        nombre: "Musica 1",
        precio: 5.8,
        tiempo: 2
    },{
        autor: "Orion",
        descripcion:"aklsdgklaklgmladg",
        imagen:"https://firebasestorage.googleapis.com/v0/b/orion-proyect.appspot.com/o/Iconos%2FSin%20t%C3%ADtulo-2.png?alt=media&token=1df74b69-94a5-4fe4-b269-bc5d44fa52be",
        key: "key 3",
        nombre:"xd",
        precio:3.9,
        tiempo:"155"
    }, {
        autor: "Yo papi",
        descripcion: "Informacion de musica 1",
        deshabilitado: true,
        imagen: "https://firebasestorage.googleapis.com/v0/b/orion-proyect.appspot.com/o/Iconos%2FSin%20t%C3%ADtulo-3.png?alt=media&token=a08abb3c-c35c-457f-bf7a-f99e6166beba",
        key: "Key 1",
        nombre: "Musica 1",
        precio: 5.8,
        tiempo: 2
    }, {
        autor: "Yo papi",
        descripcion: "Informacion de musica 1",
        deshabilitado: true,
        imagen: "https://firebasestorage.googleapis.com/v0/b/orion-proyect.appspot.com/o/Iconos%2FSin%20t%C3%ADtulo-3.png?alt=media&token=a08abb3c-c35c-457f-bf7a-f99e6166beba",
        key: "Key 1",
        nombre: "Musica 1",
        precio: 5.8,
        tiempo: 2
    },{
        autor: "Orion",
        descripcion:"aklsdgklaklgmladg",
        imagen:"https://firebasestorage.googleapis.com/v0/b/orion-proyect.appspot.com/o/Iconos%2FSin%20t%C3%ADtulo-2.png?alt=media&token=1df74b69-94a5-4fe4-b269-bc5d44fa52be",
        key: "key 3",
        nombre:"xd",
        precio:3.9,
        tiempo:"155"
    }, {
        autor: "Yo papi",
        descripcion: "Informacion de musica 1",
        deshabilitado: true,
        imagen: "https://firebasestorage.googleapis.com/v0/b/orion-proyect.appspot.com/o/Iconos%2FSin%20t%C3%ADtulo-3.png?alt=media&token=a08abb3c-c35c-457f-bf7a-f99e6166beba",
        key: "Key 1",
        nombre: "Musica 1",
        precio: 5.8,
        tiempo: 2
    }]

    return (
        <div className={styleCarrito.container}>
            <div className={styleCarrito.nav}>
                <Link to="/">
                    <h2>Volver</h2>
                </Link>      
            </div>
            <div className={styleCarrito.productContainer}>
                    {productos.map(data => {
                        return (
                            <div className={styleCarrito.product}>
                                <img src={data.imagen} alt="" width="150px"/>
                                <div className={styleCarrito.detailProduct}>
                                    <h1>{data.nombre}</h1>
                                    <h2>Autor:{data.autor}</h2>
                                    <h2>Tiempo:{data.autor}</h2>
                                </div>
                            </div>
                        )
                    })}
            </div>
            <div className={styleCarrito.navCount}>
                <h1>TOTAL = {productos.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.precio,
                    initialValue
                )
                    } <strong>USD</strong></h1>
                <div>
                
                </div>
            </div>


        </div>
    )
};

export default Carrito;
