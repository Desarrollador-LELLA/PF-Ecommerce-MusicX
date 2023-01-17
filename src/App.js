import { allAuth, allDb, auth, db } from './firebaseInicial/firebase';

function App() {

  const algo = async () => {
    try { 
      const res = await allAuth.createUserWithEmailAndPassword(auth, 'lella.soporte@gmail.com', '123456')

      console.log(res)
      if (res.user) {
        const userData = {
          id: res.user.uid,
          pnombre: 'Luis',
          correo: 'luis.llancamil.a@gmail.com',
          fechaCreacion: allDb.serverTimestamp(),
        };
        await allDb.setDoc(allDb.doc(db, 'usuarios', res.user.uid), userData);
        await allAuth.sendEmailVerification(res.user);
      }
    } catch(error){
      console.log(error)
    }
    
  };

  return (
    <div className="App">
      <h1>PENE RICO</h1>
      <button onClick={algo}>PENE GRANDE Y RICO</button>
    </div>
  );
}

export default App;
