import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { Box, Typography } from "@mui/material";

const Massage = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <Box
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
      sx={{
        flexDirection:
          message.senderId === currentUser.uid ? "row-reverse" : "row",
        display: "flex",
        marginBottom: "20px",
        paddingX: 2,
        gap: "5px",
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: "#d1c4e9",
          fontWeight: 300,
          alignItems: "center",
        }}
      >
        <Box
          component={"img"}
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="userPhoto"
          sx={{
            objectFit: "cover",
            width: 50,
            height: 50,
            borderRadius: 50,
          }}
          loading="lazy"
        />
        <Typography>just now</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#7e57c2",
          padding: "8px 20px",
          height: "fit-content",
          borderRadius:
            message.senderId === currentUser.uid
              ? "10px 0px 10px 10px"
              : "0px 10px 10px 10px",
          maxWidth: "max-content",
          margin: 0,
        }}
      >
        <Typography color={"white"}>{message.text}</Typography>
        {message.img && (
          <Box
            component={"img"}
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt="userPhoto"
            sx={{
              objectFit: "cover",
              width: 200,
              borderRadius: 1,
              //   height: 50,
            }}
            loading="lazy"
          />
        )}
      </Box>
    </Box>
  );
};

export default Massage;
