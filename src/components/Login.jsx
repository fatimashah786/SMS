import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUserAuth } from "../context/UserAuthContext";
import { TextField } from "@mui/material";

const Login = () => {
  useEffect(() => {
    document.title = "SignIn";
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      setEmailError("");
    } else if (name === "password") {
      setPassword(value);
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    // Email validation
    if (!email) {
      setEmailError("Email is required");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
    }

    // If both email and password are empty, return without attempting login
    if (!email || !password) {
      return;
    }

    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("Email is not registered ");
          break;
        case "auth/wrong-password":
          setError("Invalid email or password");
          break;
        case "auth/invalid-email":
          setError("Invalid email format");
          break;
        case "auth/invalid-credential":
          setError("Invalid email or password");
          break;
        default:
          setError("An error occurred. Please try again.");
          break;
      }
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border border-gray-300">
        <h1 className="mb-3 text-center text-3xl font-semibold">Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            margin="normal"
            label="Email"
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
            error={!!emailError}
            sx={{ width: "300px", marginLeft: "50px" }}
            helperText={emailError}
          />

          <TextField
            margin="normal"
            label="Password"
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
            error={!!passwordError}
            sx={{ width: "300px", marginLeft: "50px" }}
            helperText={passwordError}
          />
          {/* {error && <p className="text-red-500 mb-3 mr-95">{error}</p>}*/}
          {error && (
            <p
              style={{
                width: "300px",
                marginLeft: "50px",
                marginBottom: "0.75rem",
              }} // Adjust marginLeft to match input tags
              className="text-red-500"
            >
              {error}
            </p>
          )}

          <div className="text-center mt-4 ">
            <button
              style={{ width: "230px", height: "50px", padding: "10px 20px" }}
              size="large"
              className="btn  btn-outline-primary font-sans font-bold text-center uppercase"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="text-center mt-4 ">
          <button
            size="large"
            className=" btn  btn-outline-primary select-none font-sans font-bold text-center uppercase 
          transition-all disabled:opacity-50 disabled:shadow-none 
          disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg border 
          border-blue-gray-500 text-blue-gray-500 hover:opacity-75 focus:ring 
          focus:ring-blue-gray-200 active:opacity-[0.85] items-center gap-3"
            type="button"
            onClick={handleGoogleSignIn}
          >
            &nbsp; Continue with Google
          </button>
        </div>

        <div className="p-4 box mt-3 text-center">
          Don't have an account? &nbsp;
          <Link
            className="text-blue-900 text-decoration-underline underline "
            to="/signup"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
