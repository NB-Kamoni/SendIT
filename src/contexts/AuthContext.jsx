import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('guest');

  useEffect(() => {
    const savedUserRole = localStorage.getItem('userRole');
    if (savedUserRole) {
      setUserRole(savedUserRole);
    }

    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });

      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      const isGoogle = user.providerData.some(
        (provider) => provider.providerId === "google.com"
      );
      setIsGoogleUser(isGoogle);

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
      setUserRole('guest');
    }

    setLoading(false);
  }

  useEffect(() => {
    if (userRole !== 'guest') {
      localStorage.setItem('userRole', userRole);
    }
  }, [userRole]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userRole'); // Remove the user role from localStorage
      setCurrentUser(null);
      setUserLoggedIn(false);
      setUserRole('guest');
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    userRole,
    setCurrentUser,
    setUserRole,
    handleLogout, // Expose the handleLogout function
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
