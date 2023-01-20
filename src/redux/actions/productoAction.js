import { allAuth, allDb, auth, db } from '../../firebaseInicial/firebase';
//import { collection, getDocs } from "firebase/firestore"; 

/*
const lista_Productos = await allDb.getDocs(allDb.collection(db, "producto"));

lista_Productos.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
});
*/

/*
export const all_productos = async () => {
    const doc_productos = await getDocs(collection(db, "productos"));
    const res = [];

    doc_productos.forEach(prod => {
        res.push({
            id: prod.id, 
            ...prod.data()
        })
    })

    return res;
}
*/


/*
export const prueba_final = async () => {
    // Query the first page of docs
    const first = await allDb.query(allDb.collection(db, "productos"), allDb.orderBy("nombre"), allDb.limit(25));
    const documentSnapshots = await allDb.getDocs(first);

    // Get the last visible document
    const lastVisible = await documentSnapshots.docs[documentSnapshots.docs.length - 1];
    console.log("last", lastVisible);

    // Construct a new query starting at this document,
    // get the next 25 cities.
    const next = await allDb.query(allDb.collection(db, "productos"),
        allDb.orderBy("nombre"),
        allDb.startAfter(lastVisible),
        allDb.limit(10));

    return lastVisible;
}
*/


export const prueba_final = async () => {

    //omitir
    // const lista_Productos = await allDb.getDocs(allDb.collection(db, "producto"));
    // lista_Productos.forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    // });
  
    //   Query the first page of docs
    const first = await allDb.query(
        allDb.collection(db, "productos"),
        //orderBy("population"),
        allDb.limit(25)
    );
    const documentSnapshots = await allDb.getDocs(first);
    const todo = await documentSnapshots.docs;

    // Get the last visible document
    const lastVisible = await documentSnapshots.docs[
        documentSnapshots.docs.length - 1
    ];
  
    // Construct a new query starting at this document,
    // get the next 25 cities.
    const next = await allDb.query(
        allDb.collection(db, "productos"),
        // orderBy("population"),
        // startAfter(lastVisible),
        allDb.limit(25)
    );
  
    return todo;
};


/*
export const detalle_producto_admin = async (id) => {
    const detail = await allDb.getDoc(allDb.doc(db, "productos", id));
    return detail;
}
*/


export const detalle_producto_admin = async (id) => {
    
    const docRef = allDb.doc(db, "productos", id);
    const docSnap = await allDb.getDoc(docRef);
  
    if (docSnap.exists()) {
  
      // console.log("Document data:", docSnap.data());
  
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
    }
  //   console.log(docSnap);
    return docSnap.data()
};

const getProductos = async () => {


  //omitir
  // const lista_Productos = await allDb.getDocs(allDb.collection(db, "producto"));
  // lista_Productos.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // });


  //   Query the first page of docs
  const first = await allDb.query(
    allDb.collection(db, "productos"),
    //orderBy("population"),
    allDb.limit(25)
  );
  const documentSnapshots = await allDb.getDocs(first);
  const todo = await documentSnapshots.docs;


  // Get the last visible document
  const lastVisible = await documentSnapshots.docs[
    documentSnapshots.docs.length - 1
  ];
  // console.log("last", lastVisible);

  // Construct a new query starting at this document,
  // get the next 25 cities.
  const next = await allDb.query(
    allDb.collection(db, "productos"),
    // orderBy("population"),
    // startAfter(lastVisible),
    allDb.limit(25)
  );

  return todo;
};

export { getProductos };

//pa ver si yaxd
