import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";
import Avatar from "../img/Avatar.jpg";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

export const SearchBar = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    setLoading(true);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
      console.log(user);
    } catch (err) {
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      sx={{
        width: "150%",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#b39ddb",
      }}
    >
      <TextField
        sx={{
          width: "100%",
          backgroundColor: "#d1c4e9",
        }}
        color={"secondary"}
        id="outlined-search"
        label="Find Users"
        type="search"
        variant="filled"
        onKeyDown={handleKey}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      {loading ? (
        <Box
          sx={{
            padding: 1,
          }}
        >
          <CircularProgress color={"secondary"} />
        </Box>
      ) : err ? (
        <span>User not found!</span>
      ) : (
        user && (
          <Button
            color={"secondary"}
            variant="text"
            className="userChat"
            onClick={handleSelect}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              paddingY: 1,
              paddingX: 2,
              cursor: "pointer",
            }}
          >
            <Box
              component={"img"}
              src={user.photoURL ? user.photoURL : Avatar}
              alt="userPhoto"
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                objectFit: "cover",
              }}
              loading="lazy"
            />
            <Box>
              <Typography variant="body1">{user.displayName}</Typography>
            </Box>
          </Button>
        )
      )}
    </Box>
  );
};
