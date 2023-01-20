import { allAuth, allDb, auth, db } from '../../firebaseInicial/firebase';

export const detalle_usuario_cliente = async (id) => {
    try {
        
    
    const docRef = allDb.doc(db, "usuarios", id);
    const docSnap = await allDb.getDoc(docRef);
  
    if (docSnap.exists()) {
  
    console.log("Document data:", docSnap.data());
  
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
    }
  //   console.log(docSnap);
    return docSnap
} catch (error) {
    console.log(error);
}
};
