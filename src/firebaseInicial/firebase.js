import fireConfig from './config';
import { initializeApp } from 'firebase/app';
import * as allAuth from 'firebase/auth';
import * as allDb from 'firebase/firestore';
import * as allStor from 'firebase/storage'


const app = initializeApp(fireConfig);
const stor = allStor.getStorage(app);
const auth = allAuth.getAuth(app);
const db = allDb.getFirestore(app);

export default app;
export { db, allDb, auth, allAuth, stor, allStor };