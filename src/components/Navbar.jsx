import * as React from "react";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";

import MuiAppBar from "@mui/material/AppBar";
import { useAppStore } from "../components/appStore";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
export default function Navbar() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);

  const AppBar = styled(
    MuiAppBar,
    {}
  )(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
  }));
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: "block",
              sm: "none",
              color: "white",
              fontFamily: "cursive",
            }}
          >
            Student Management System
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "red", marginLeft: "auto", fontWeight: "large" }} // Align to left and set background color to red
            onClick={handleLogout}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
