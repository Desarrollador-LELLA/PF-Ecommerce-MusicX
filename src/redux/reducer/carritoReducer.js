import {
  ENVIAR_CORREO,
  ELIMINAR_PRODUCTO,
  DETALLE_UN_PRODUCTO,
  ADD_PRODUCTOS,
  ADD_PRODUCTO,
  ADD_BIBLIOTECA,
  LIMPIAR_DETALLE_CARRITO,
} from "../types/carritoTypes.js";

const initialState = {
  productos: [],
  productoUnoDetalle: {},
  biblioteca: [],
};

const carritoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ELIMINAR_PRODUCTO:
      console.log("actionEliminar", action.payload);
      let productosCarritoFiltrados = state.productos.filter(
        (producto) =>
          producto.id !== action.payload.id ||
          producto.licencias.TipoLicencia !==
            action.payload.licencia.TipoLicencia
      );
      return {
        ...state,
        productos: productosCarritoFiltrados,
      };
    case ADD_PRODUCTOS:
      return {
        ...state,
        productos: action.payload,
      };
    case ADD_PRODUCTO:
      let existe = false;
      state.productos.forEach((producto) => {
        if (producto.id === action.payload.producto.id) {
          if (
            producto.licencias.TipoLicencia ===
            action.payload.producto.licencias.TipoLicencia
          ) {
            existe = true;
          }
        }
      });

      let productosAdd = !existe
        ? [...state.productos, { ...action.payload.producto }]
        : state.productos;
      return {
        ...state,
        productos: productosAdd,
      };
    case DETALLE_UN_PRODUCTO:
      return {
        ...state,
        productoUnoDetalle: action.payload,
      };
    case LIMPIAR_DETALLE_CARRITO:
      return {
        ...state,
        productos: [],
      };
    default: {
      return state;
    }
  }
};

export default carritoReducer;
