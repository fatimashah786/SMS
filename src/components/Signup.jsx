import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { TextField } from "@mui/material";

const Signup = () => {
  const { signUp } = useUserAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    // Validation
    for (const field in formData) {
      if (!formData[field].trim()) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      } else if (field === "email" && !/^\S+@\S+$/.test(formData[field])) {
        newErrors[field] = "Invalid email address";
      } else if (field === "password") {
        const passwordRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/;
        if (!passwordRegex.test(formData[field])) {
          newErrors[field] =
            "Password must be at least 6 characters and contain at least one letter, one digit, and one special character";
        }
      }
    }

    // Setting errors if any
    setErrors(newErrors);

    // Submit if no errors
    if (Object.keys(newErrors).length === 0) {
      try {
        await signUp(formData.email, formData.password);
        navigate("/");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("Email is already in use");
        } else {
          console.error("Error:", error.message);
        }
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border border-gray-300">
        <h1 className="mb-3 text-center text-4xl font-semibold">Sign Up</h1>
        {errorMessage && (
          <p className="text-red-500 mb-3">&#9888;{errorMessage}</p>
        )}
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          {Object.keys(formData).map((field) => (
            <TextField
              key={field}
              margin="normal"
              sx={{ width: "100%" }} // Adjust width for mobile
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              error={!!errors[field]}
              helperText={errors[field]}
              type={field === "password" ? "password" : "text"}
            />
          ))}

          <div className="text-center mt-4">
            <button
              className="btn btn-outline-primary font-sans font-bold uppercase w-full"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          Already have an account?&nbsp;
          <Link className="text-blue-900 underline" to="/">
            Sign-In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
