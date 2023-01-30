import { allDb, db } from "../firebaseInicial/firebase";

const getGeneros = async () => {
    const first = await allDb.query(
      allDb.collection(db, "generos"),allDb.orderBy("nombre")
    );
    const documentSnapshots = await allDb.getDocs(first);
    const todo = await documentSnapshots.docs;
    return todo;
};

export {getGeneros}