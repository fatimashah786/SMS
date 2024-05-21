import { Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import React from "react";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Nofile from "./components/Nofile";
import SideNav from "./components/SideNav";
import Student from "./components/students/Student";
import Box from "@mui/material/Box";
import Project from "./components/Project/Project";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Box>
        <UserAuthContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <SideNav />
                  <Navbar></Navbar>
                </ProtectedRoute>
              }
            />

            <Route
              path="/project"
              element={
                <ProtectedRoute>
                  <Project />
                </ProtectedRoute>
              }
            />

            <Route
              path="/lg"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/student"
              element={
                <ProtectedRoute>
                  <Student />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Nofile />} />
          </Routes>
        </UserAuthContextProvider>
      </Box>
    </>
  );
}

export default App;
