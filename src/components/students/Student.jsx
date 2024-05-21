import React from "react";

import SideNav from "../SideNav";
import Navbar from "../Navbar";
import Box from "@mui/material/Box";
import StudentList from "./StudentList";

function Student() {
  return (
    <>
      <div>
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <SideNav />
          <Box component="main" sx={{ flexgrow: 1, p: 3 }}>
            <StudentList />
          </Box>
        </Box>
      </div>
    </>
  );
}

export default Student;
