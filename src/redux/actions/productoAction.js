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


//omitir
// const lista_Productos = await allDb.getDocs(allDb.collection(db, "producto"));
// lista_Productos.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
// });


export const listado_producto_by_admin = async () => {

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
  
    if (docSnap.exists())
    {
      // console.log("Document data:", docSnap.data());
  
    } else {
      // doc.data() will be undefined in this case
      // console.log("No such document!");
    }

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




const getTeste = async () => {
// aqui yo creo la consulta 
  const first = await allDb.query(
    allDb.collection(db, "productos"),
    allDb.orderBy("nombre"),
    allDb.limit(2)
   
  );
  //aqui yo ejecuto la consulta de frist 
   const documentSnapshots = await allDb.getDocs(first);
   //extraer los documentos de la consulta para desencriptarlos 
  const todo = await documentSnapshots.docs;
 //extrayendo el ultimo documento de la consulta y lo guardo en lastvisible 
  const lastVisible = await documentSnapshots.docs[
    documentSnapshots.docs.length - 1
  ];
  //extrayendo el primero documento de la consulta y lo guardo en fristvisible
  const fristVisible = await documentSnapshots.docs[
    documentSnapshots.docs.length - 2
  ];
  //crear la consulta empieza desde cierta parte hacia adelante 
  const next = await allDb.query(
    allDb.collection(db, "productos"),
     allDb.orderBy("nombre"),
     allDb.startAt(lastVisible),
    allDb.limit(2)
  );

  const document = await allDb.getDocs(next);
  const siguente  = await document.docs;

  const lastVisible2 = await document.docs[
    document.docs.length - 1
  ];
  const fristVisible2 = await document.docs[
    document.docs.length - 2
  ];
// crear la consulta empieza desde cierta parte hacia atras 
  const previus = await allDb.query(
    allDb.collection(db, "productos"),
     allDb.orderBy("nombre"),
     allDb.startAfter(fristVisible2),
    allDb.limit(2)
  );
  const document3 = await allDb.getDocs(previus);
  const anterior  = await document3.docs;

   const lastVisible3 = await document3.docs[
    document3.docs.length - 1
  ];
  const fristVisible3 = await document3.docs[
    document3.docs.length - 2
  ];
  
  return {todo ,anterior, siguente};
};
export { getProductos  , getTeste };


