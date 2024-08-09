import React from "react";
import { auth } from "../../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../../contexts/AuthContext"; // Assuming your context is in this path

function ClientSignupPage() {
  const { setUserRole } = useAuth();

  const handleSignup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set the role as 'client'
      setUserRole("client");

      // Additional signup logic...
      console.log("Client signed up:", user);
    } catch (error) {
      console.error("Error during client signup:", error);
    }
  };

  return (
    <div>
      <h2>Client Signup</h2>
      {/* Example form for collecting email and password */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.elements.email.value;
          const password = e.target.elements.password.value;
          handleSignup(email, password);
        }}
      >
        <input type="email" name="email" placeholder="Enter your email" required />
        <input type="password" name="password" placeholder="Enter your password" required />
        <button type="submit">Sign Up as Client</button>
      </form>
    </div>
  );
}

export default ClientSignupPage;
