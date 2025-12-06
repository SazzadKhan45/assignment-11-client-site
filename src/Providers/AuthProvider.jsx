import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import { auth } from "../Firebase/firebase.init";

// Google provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google Login ##############################
  const logInUserWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Register user with email & password ####################
  const registerUserEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user with email & password ####################
  const loginUserEmailPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Update user profile
  const updateUserProfile = (profileData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profileData);
  };

  // Track current user ###############################
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //LogOut User
  const LogoutUser = () => {
    return signOut(auth);
  };

  //AuthInfo ####################################
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    logInUserWithGoogle,
    registerUserEmailPassword,
    loginUserEmailPassword,
    updateUserProfile,
    LogoutUser,
  };

  //Pass the auth info
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
