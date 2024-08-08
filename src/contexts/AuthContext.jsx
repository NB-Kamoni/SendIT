import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
// import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Function to determine user role based on email suffix
const getUserRole = (email) => {
  if (email.endsWith('@student.moringaschool.com')) {
    return 'admin';
  } else if (email.endsWith('@gmail.com')) {
    return 'client';
  } else if (email.endsWith('@yahoo.com')) {
    return 'courier';
  } else {
    return 'guest';
  }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('guest');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });

      // check if provider is email and password login
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      // check if the auth provider is google or not
      // const isGoogle = user.providerData.some(
      //   (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
      // );
      // setIsGoogleUser(isGoogle);

      // Determine and set the user's role based on email
      const role = getUserRole(user.email);
      setUserRole(role);

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      setUserRole('guest');
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    userRole, // Expose userRole in context
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;