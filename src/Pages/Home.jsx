import React from "react";
import Chat from "./Chat";
import "../App.scss";
import SideBar from "./SideBar";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box display={"flex"}>
      <SideBar />
      <Chat />
    </Box>
  );
};

export default Home;
