import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth, firestore } from "../firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const register = async (email, password) => {
    // return createUserWithEmailAndPassword(auth, email, password);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCred.user.uid;
      
      await setDoc(doc(firestore, "users", userId), {
        createdAt: Timestamp.now()
      })
      setCurrentUser(userCred.user);
      return userCred;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const login = async (email, password) => {
    // return signInWithEmailAndPassword(auth, email, password);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCred.user)
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const logout = () => {
    return signOut(auth);
  }

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   setCurrentUser(user);
    //   setLoading(false);
    // });
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}