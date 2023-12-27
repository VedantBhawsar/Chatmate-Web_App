import React from "react";
import Chats from "../Component/Chats";
import NavBar from "../Component/NavBar";
import { Box } from "@mui/material";

const SideBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "10vw",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <NavBar />
      <Chats />
    </Box>
  );
};

export default SideBar;
