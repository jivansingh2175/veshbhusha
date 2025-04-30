// src/context/AuthContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Reference to the user document in Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        // If user doesn't exist, create it
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            email: currentUser.email || "",
            name: currentUser.displayName || "",
            phone: currentUser.phoneNumber || "",
            gender: "",
            createdAt: new Date(),
          });
        }
      } else {
        setUser(null);  // User is logged out, clear the state
      }

      setLoading(false);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // Logout function
  const logout = async () => {
    await signOut(auth);
    setUser(null);  // Ensure user state is cleared after logging out
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}  {/* Render children once loading is complete */}
    </AuthContext.Provider>
  );
};

// Custom hook to access the Auth context
export const useAuth = () => useContext(AuthContext);
