import {
  PAGAR,
  ELIMINAR_PRODUCTO,
  DETALLE_UN_PRODUCTO,
  ADD_PRODUCTOS
} from "../types/carritoTypes.js";

const initialState = {
  productos: [],
  productoUnoDetalle: {},
};

const carritoReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGAR:
      return state;
    case ELIMINAR_PRODUCTO:
       return {
            ...state,
            productos: state.productos.filter((producto) => producto.nombre != action.payload)        
       };
    case ADD_PRODUCTOS: 
          return {
            ...state,
            productos: action.payload
          }
    case DETALLE_UN_PRODUCTO:
      return {
        ...state,
        productoUnoDetalle: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default carritoReducer;
