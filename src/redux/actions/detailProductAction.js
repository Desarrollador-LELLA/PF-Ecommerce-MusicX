import { allDb, db } from "../../firebaseInicial/firebase";

const getProducto = async (id) => {
  const docRef = allDb.doc(db, "productos", `${id}`);
  const docSnap = await allDb.getDoc(docRef);

  console.log("Informacion", docSnap.data());
  return docSnap.data();
};

export { getProducto };
