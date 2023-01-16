import fireConfig from './config';
import { initializeApp } from 'firebase/app';
import * as allAuth from 'firebase/auth';
import * as allDb from 'firebase/firestore';

const app = initializeApp(fireConfig);

const auth = allAuth.getAuth(app);
const db = allDb.getFirestore(app);
//store

export default app;
export { db, allDb, auth, allAuth };