import React, { useState } from "react";
import { auth } from "../../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../../contexts/AuthContext";
import "./ClientSignupPage.css";

function ClientSignupPage() {
  const { setUserRole } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      // Authenticate the user with Firebase and get the user UID
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const firebaseUid = user.uid; // Get the Firebase UID

      setUserRole("client");

      // Create the JSON object to send to the backend
      const requestBody = {
        email: email,
        firebase_uid: firebaseUid, // Send Firebase UID instead of password
        role: "client",
        agree_to_terms: agreeToTerms,
      };

      // Send the data to the Flask API
      const response = await fetch("https://sendit-server-j68q.onrender.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to the server");
      }

      console.log("Client signed up and data sent to server:", user);
      // You can navigate the user to another page here if needed
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email already exists");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("Password is too weak");
      } else {
        setErrorMessage(error.message || "An error occurred during signup");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "agreeToTerms":
        setAgreeToTerms(e.target.checked);
        break;
      default:
        break;
    }

    setIsButtonEnabled(
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword &&
      e.target.name === "agreeToTerms"
        ? e.target.checked
        : agreeToTerms
    );

    if (errorMessage) {
      setErrorMessage(""); // Clear error message on new input
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <img
          src="https://res.cloudinary.com/dan7dm7kx/image/upload/v1724591446/Black-logo_pb4qel.png"
          alt="Company Logo"
          className="signup-logo"
        />
        <form onSubmit={handleSignup} className="signup-form">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
            className="signup-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleInputChange}
            className="signup-input"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleInputChange}
            className="signup-input"
            required
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <label className="signup-terms">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={agreeToTerms}
              onChange={handleInputChange}
            />
            I agree to the terms and conditions
          </label>
          <button
            type="submit"
            className={`signup-button ${!isButtonEnabled ? "disabled" : ""}`}
            disabled={!isButtonEnabled}
          >
            Sign Up
          </button>
        </form>
        <div className="register-link">
          Already have an account? <a href="/login" className="sign-up-link">Login</a>
        </div>
      </div>
    </div>
  );
}

export default ClientSignupPage;
