import { allDb, db } from "../../firebaseInicial/firebase";

const getProducto = async () => {
  const docRef = allDb.doc(db, "productos", "UChyFCpBGWkVcMWpC2Qt");
  const docSnap = await allDb.getDoc(docRef);

  console.log("Informacion", docSnap.data());
  return docSnap;
};

export { getProducto };
