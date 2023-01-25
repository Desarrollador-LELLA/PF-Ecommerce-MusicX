import { unDocumento } from "../../utils/metodosFirebase";


export const detalle_usuario_cliente = async (id) => {
  console.log(id)
      const datosdeU = await unDocumento("usuarios", id)
      
      console.log(datosdeU)
      return datosdeU

};
