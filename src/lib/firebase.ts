import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey:            'AIzaSyCAlj4GRG6ltsbuTCn2KunGOKwDykvT-2Y',
  authDomain:        'budgetflow-1b60f.firebaseapp.com',
  projectId:         'budgetflow-1b60f',
  storageBucket:     'budgetflow-1b60f.firebasestorage.app',
  messagingSenderId: '915637222655',
  appId:             '1:915637222655:web:870b36bdd1ae6f345120ca',
};

export const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
