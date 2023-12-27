import React, { useContext } from "react";
// import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import Input from "../Component/Input";
import Massages from "../Component/Massages";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Chat = () => {
  const { data, dispatch } = useContext(ChatContext);
  console.log(data);
  return (
    <>
      {data.chatId === "null" ? (
        <Box
          sx={{
            display: "flex",
            height: "80px",
            backgroundColor: "#4527a0",
            justifyContent: "space-between",
            alignItems: "center",
            paddingX: 3,
          }}
        ></Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#4527a0",
              alignItems: "center",
              px: 3,
              gap: 2,
              height: "79px",
            }}
          >
            <IconButton
              sx={{
                color: "#d1c4e9",
                padding: 1,
                "&:hover": {},
              }}
              onClick={() => dispatch({ type: "CHANGE_USER", payload: "null" })}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box
              component={"img"}
              src={data.user?.photoURL}
              alt="userPhoto"
              sx={{
                width: 50,
                height: 50,
                borderRadius: 50,
                objectFit: "cover",
              }}
              loading="lazy"
            />
            <Box>
              <Typography color={"#ede7f6"} variant="body1" fontWeight={600}>
                {data.user?.displayName}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "89vh",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Massages />
            <Input />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Chat;
