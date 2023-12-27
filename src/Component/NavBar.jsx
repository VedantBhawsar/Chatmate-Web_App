import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Search } from "@mui/icons-material";
import { SearchBar } from "./Search";

const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setCurrentUser("null");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "80px",
        backgroundColor: "#4527a0",
        justifyContent: "space-between",
        alignItems: "center",
        paddingX: 3,
      }}
    >
      <Typography variant="h4" color={"#d1c4e9"} fontFamily={"Josefin Sans"}>
        Chatmate
      </Typography>
      <Box
        display={"flex"}
        sx={{
          justifyContent: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <IconButton
          sx={{
            color: "#d1c4e9",
            padding: 1,
            "&:hover": {
              //   color: "#7e57c2",
            },
          }}
          onClick={() => {
            setOpenSearch((prev) => !prev);
          }}
        >
          <Search />
        </IconButton>
        {/* <Typography color={"white"}>{userName[0].toUpperCase()}</Typography> */}
        <Tooltip title="Signout">
          <IconButton
            sx={{
              color: "#d1c4e9",
              padding: 1,
              "&:hover": {
                //   color: "#7e57c2",
              },
            }}
            onClick={handleClick}
          >
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
        {openSearch && (
          <Box
            sx={{
              left: 0,
              position: "absolute",
            }}
          >
            <SearchBar />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
