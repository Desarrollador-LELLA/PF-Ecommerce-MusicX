import {
  PAGAR,
  ELIMINAR_PRODUCTO,
  DETALLE_UN_PRODUCTO,
  ADD_PRODUCTOS,
  ADD_PRODUCTO,
  ADD_BIBLIOTECA
} from "../types/carritoTypes.js";

const initialState = {
  productos: [],
  productoUnoDetalle: {},
  biblioteca: []
};

const carritoReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAGAR:
      return state;
    case ELIMINAR_PRODUCTO:
       return {
            ...state,
            productos: state.productos.filter((producto) => producto.id != action.payload)        
       };
    case ADD_PRODUCTOS: 
          return {
            ...state,
            productos: action.payload
          }
    case ADD_PRODUCTO: 
          return {
            ...state,
            productos: [...state.productos, {...action.payload.producto, valor: action.payload.valor}]
          }
    case DETALLE_UN_PRODUCTO:
      return {
        ...state,
        productoUnoDetalle: action.payload,
      };
    case ADD_BIBLIOTECA:    
          return {
            ...state,
              biblioteca: [...state.biblioteca, action.payload]
          }
    default: {
      return state;
    }
  }
};

export default carritoReducer;
