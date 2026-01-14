import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCgl9t1xk_sXJPc1GYr0s5rwtzCt-LPWVY",
  authDomain: "pinnacle-p2.firebaseapp.com",
  projectId: "pinnacle-p2",
  storageBucket: "pinnacle-p2.firebasestorage.app",
  messagingSenderId: "193777060336",
  appId: "1:193777060336:web:d3ee9a133e816a0877b535"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export {
  auth,
  googleProvider,
  githubProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
};