import { unDocumento } from "../../utils/metodosFirebase";


export const detalle_usuario_cliente = async (id) => {
      const datosdeU = await unDocumento("usuarios", id)
      return datosdeU
};
