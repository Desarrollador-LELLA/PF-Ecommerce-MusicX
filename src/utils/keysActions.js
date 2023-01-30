import { allDb, db } from "../firebaseInicial/firebase";

const getKeys = async () => {
    const first = await allDb.query(
      allDb.collection(db, "Key"),allDb.orderBy("id")
    );
    const documentSnapshots = await allDb.getDocs(first);
    const todo = await documentSnapshots.docs;
    return todo;
};

export {getKeys}