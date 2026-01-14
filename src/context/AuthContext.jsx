import { createContext, useState, useEffect } from 'react';
import {
  auth,
  googleProvider,
  githubProvider,
  signInWithPopup,
  signInWithEmailAndPassword as firebaseEmailSignIn,
  createUserWithEmailAndPassword as firebaseEmailSignUp,
  firebaseSignOut,
  onAuthStateChanged
} from '../config/firebase';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();

        // 🔥 FIXED STORAGE
        localStorage.setItem("userId", firebaseUser.uid);
        localStorage.setItem("authToken", token);

        setUser(firebaseUser);
      } else {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken();

    localStorage.setItem("userId", result.user.uid);
    localStorage.setItem("authToken", token);

    setUser(result.user);
    return result.user;
  };

  const loginWithGithub = async () => {
    const result = await signInWithPopup(auth, githubProvider);
    const token = await result.user.getIdToken();

    localStorage.setItem("userId", result.user.uid);
    localStorage.setItem("authToken", token);

    setUser(result.user);
    return result.user;
  };

  const loginWithEmail = async (email, password) => {
    const result = await firebaseEmailSignIn(auth, email, password);
    const token = await result.user.getIdToken();

    localStorage.setItem("userId", result.user.uid);
    localStorage.setItem("authToken", token);

    setUser(result.user);
    return result.user;
  };

  const registerWithEmail = async (email, password) => {
    const result = await firebaseEmailSignUp(auth, email, password);
    const token = await result.user.getIdToken();

    localStorage.setItem("userId", result.user.uid);
    localStorage.setItem("authToken", token);

    setUser(result.user);
    return result.user;
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    loginWithGoogle,
    loginWithGithub,
    loginWithEmail,
    registerWithEmail,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
