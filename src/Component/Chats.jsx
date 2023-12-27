import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { db } from "../firebase";
import { Box, Button, Typography } from "@mui/material";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [isOpenChat, setIsOpenChat] = useState({});
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    setIsOpenChat(u);
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <Box
      display={"flex"}
      height={"90vh"}
      flexDirection={"column"}
      sx={{
        overflowY: "scroll",
        padding: 1,
      }}
    >
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <Button
            variant="Text"
            key={chat[0]}
            color="secondary"
            sx={{
              borderRadius: 5,
              display: "flex",
              // backgroundColor: "#e5e4ee",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 2,
              padding: "15px 30px",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              background: chat[1].userInfo === isOpenChat && "#e5e4ee",
              "&:hover": {},
              "&:focus": {
                // boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.3)",
              },
            }}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <Box
              component={"img"}
              src={chat[1].userInfo.photoURL}
              alt="userPhoto"
              sx={{
                width: 60,
                height: 60,
                borderRadius: 50,
                objectFit: "cover",
              }}
              loading="lazy"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                // gap: 8,

                color: "text.secondary",
                "& .last-message": {
                  color: "text.tertiary", // Use a slightly lighter tertiary color for the last message
                },
              }}
            >
              <Typography variant="body1" fontWeight={600}>
                {chat[1].userInfo.displayName}
              </Typography>
              <Typography variant="caption" className="last-message">
                {chat[1].lastMessage?.text}
              </Typography>
            </Box>
          </Button>
        ))}
    </Box>
  );
};

export default Chats;
