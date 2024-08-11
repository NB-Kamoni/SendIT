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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setUserRole("client");
      console.log("Client signed up:", user);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("Email already exists");
      } else if (error.code === "auth/weak-password") {
        setErrorMessage("Password is too weak");
      } else {
        setErrorMessage("An error occurred during signup");
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
          src="src/assets/Black-logo.png"
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
