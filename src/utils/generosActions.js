import { allDb, db } from "../firebaseInicial/firebase";

const getGeneros = async () => {
    const first = await allDb.query(
      allDb.collection(db, "generos"),allDb.orderBy("nombre"), allDb.where("habilitado", "==", "true")
    );
    const documentSnapshots = await allDb.getDocs(first);
    const todo = await documentSnapshots.docs;
    return todo;
};

export { getGeneros }
