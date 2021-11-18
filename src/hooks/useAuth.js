import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut } from "firebase/auth";

const useAuth = (firebase) => {
  const [user, setUser] = useState({});

  /**
   * @description Function which is listening the user state
  */
  useEffect(() => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, handleAuthState);
  }, [firebase]);

  /**
    * @description Function which handle Auth state
    * @param {object} user - the user who sign in o sign out
  */
  const handleAuthState = (user) => {
    if (user) {
      const { displayName, email, photoURL, uid, accessToken } = user;
      localStorage.setItem("bearer", accessToken);
      setUser({ name: displayName, email, photoURL, uid });
    }
  };
  /**
   * Function to google log in
   */
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await signInWithPopup(auth, provider)
      .catch((error) => { console.error(error);});
  };
  /**
   * Function to google log out
   */
  const googleLogout = () => {
    const auth = getAuth();
    signOut(auth).catch((error) => { console.error(error);});
  };

  return {
    googleLogin,
    googleLogout,
    user
  };
};

export default useAuth;
