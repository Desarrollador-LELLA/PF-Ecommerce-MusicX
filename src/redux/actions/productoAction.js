import { allAuth, allDb, auth, db } from '../../firebaseInicial/firebase';

const lista_Productos = await allDb.getDocs(allDb.collection(db, "producto"));

lista_Productos.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
});

