import {ELIMINAR_PRODUCTO, PAGAR} from "../types/carritoTypes.js";

export const pagarCarrito = () => {
    return "Aun no se hace"
};

//RECIBE EL ID EL PRODUCTO AGREGADO AL CARRITO PARA PASARSELO AL REDUCER Y QUE LO ELIMINE.
export const eliminarProducto = (id) => {
    return {
        type: ELIMINAR_PRODUCTO,
        payload: id
    }
}

