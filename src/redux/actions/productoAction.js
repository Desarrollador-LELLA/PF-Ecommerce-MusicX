import { allAuth, allDb, auth, db } from "../../firebaseInicial/firebase";

const getProductos = async () => {

lista_Productos.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});

//   Query the first page of docs
  const first =  await allDb.query(
    allDb.collection(db, "productos"),
    //orderBy("population"),
    allDb.limit(25)
  );
  const documentSnapshots = await allDb.getDocs(first);
  const todo = await documentSnapshots.docs;

  // Get the last visible document
  const lastVisible = await documentSnapshots.docs[documentSnapshots.docs.length - 1];
  // console.log("last", lastVisible);

  
  // Construct a new query starting at this document,
  // get the next 25 cities.
  const next =  await allDb.query(
    allDb.collection(db, "productos"),
    // orderBy("population"),
    // startAfter(lastVisible),
    allDb.limit(25)
  );


  return todo;


};

export { getProductos };


//pa ver si yaxd
