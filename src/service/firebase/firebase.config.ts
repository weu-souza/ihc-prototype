import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDhbpYOnFxhZ8_Oc0sLje57UwfSb9shvSY',
  authDomain: 'ihc-prototype-a4751.firebaseapp.com',
  projectId: 'ihc-prototype-a4751',
  storageBucket: 'ihc-prototype-a4751.appspot.com',
  messagingSenderId: '172486619243',
  appId: '1:172486619243:web:50fc474aa256f22806812e'
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);