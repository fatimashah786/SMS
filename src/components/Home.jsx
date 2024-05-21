import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import Navbar from "./Navbar";
import SideNav from "./SideNav";
import Box from "@mui/material/Box";

import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <Box height={80} />
      <Box sx={{ display: "flex" }}>
        <SideNav />

        <Box component="main" sx={{ flexgrow: 1, p: 3 }}>
          <h1 className="text-xl font-semibold">Welcome Back</h1>
          <div className="p-4 box mt-3 text-center">
            {/**
          Hello Welcome <br />
            {user && user.email}*/}
          </div>

          <div className="d-grid gap-2">
            <button
              style={{ width: "500px", height: "150px", padding: "10px 20px" }}
              className="btn btn-primary mt-4 bg-gray-300 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
            >
              <div className="p-4 box mt-3 text-center">
                Hello Welcome <br />
                {user && user.email}
              </div>
            </button>
          </div>

          <div className="d-grid gap-2">
            <Button
              variant="primary"
              style={{ width: "200px", height: "50px", padding: "10px 20px" }}
              onClick={handleLogout}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Log out
            </Button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Home;
