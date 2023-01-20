import {PAGAR, ELIMINAR_PRODUCTO} from "../types/carritoTypes.js";

const initialState = {
    productos: []
};

const carritoReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAGAR: 
            return state
        case ELIMINAR_PRODUCTO: 
            return {
                ...state,
                productos: state.productos.filter((producto) => producto.id !== action.payload)
            }
        default: {
            return state
        }
    }
};

export default carritoReducer;

