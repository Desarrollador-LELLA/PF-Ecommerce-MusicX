import { Route, Routes } from 'react-router-dom';
import Layout from './componets/pages/Layout';
import Home from './componets/pages/Home';
import Registro from './componets/pages/Registro';
import InicioSesion from './componets/pages/InicioSesion';
import AboutUs from './componets/pages/AboutUs';
import { useDispatch } from 'react-redux';
import { needVerificationAction, getUserById, loadingAction, uno } from './redux/actions/authAction';
import { useEffect } from 'react';
import { auth } from './firebaseInicial/firebase';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      dispatch(loadingAction(true));
      if (user) {
        dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(needVerificationAction());
        }
      } else {
        dispatch(loadingAction(false));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Home />} />
        <Route path='registro' element={<Registro />} />
        <Route path="iniciarsesion" element={<InicioSesion />} />
        <Route path='aboutus' element={<AboutUs />} />
      </Route>
    </Routes>

  );
}

export default App;
