import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import React from "react";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUserAuth();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    // Simulate a delay to ensure authentication state is fully checked
    const delay = setTimeout(() => {
      setAuthChecked(true);
    }, 200); // Adjust the delay time as needed
    // Cleanup function to clear the timeout
    return () => clearTimeout(delay);
  }, [user]);
  if (!authChecked) {
    // Loading state, do not render anything
    return null;
  }
  if (loading) {
    // Optionally, you can show a loading indicator
    return <div>Loading...</div>;
  }
  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/" />;
  }
  // Render protected content
  return children;
};

export default ProtectedRoute;
