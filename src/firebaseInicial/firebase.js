import fireConfig from './config';
import { initializeApp } from 'firebase/app';
import * as allAuth from 'firebase/auth';
import * as allDb from 'firebase/firestore';
import { getStorage } from "firebase/storage";


const app = initializeApp(fireConfig);
const storage = getStorage(app);
const auth = allAuth.getAuth(app);
const db = allDb.getFirestore(app);

export default app;
export { db, allDb, auth, allAuth, storage
 };