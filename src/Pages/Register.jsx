import React, { useState } from "react";
import "../App.scss";
// import { GrFormUpload } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Box, Divider, FormLabel, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Register = () => {
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    displayName: "",
    email: "",
    password: "",
    MobileNo: "",
    file: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const date = new Date().getTime();
      const storageRef = ref(storage, `${data.displayName + date}`);

      await uploadBytesResumable(storageRef, data.file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName: data.displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: data.displayName,
              email: data.email,
              password: data.password,
              MobileNo: data.MobileNo,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/login");
          } catch (err) {
            console.log(err);
            setError(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        className="Login Page"
        sx={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "secondary.main",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "450px",
            borderRadius: 1,
            display: "flex",
            px: 1,
            py: 5,
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              color={"#003049"}
              fontFamily={"Josefin Sans"}
              fontWeight={600}
            >
              Chatmate
            </Typography>
            <Typography variant="h6" fontFamily={"Poppins"}>
              Register
            </Typography>
          </Box>
          <Divider
            sx={{
              width: "90%",
              display: "flex",
              fontWeight: "bold",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              color="secondary"
              size="normal"
              variant="filled"
              sx={{
                width: "90%",
              }}
              value={data.displayName}
              type={"text"}
              error={error}
              label="Name"
              onChange={(e) => {
                setData({ ...data, displayName: e.target.value });
                setError(false);
              }}
            />
            <TextField
              color="secondary"
              size="normal"
              variant="filled"
              error={error}
              sx={{
                width: "90%",
              }}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
                setError(false);
              }}
              value={data.email}
              type={"email"}
              label="Email"
            />
            <TextField
              error={error}
              color="secondary"
              size="normal"
              variant="filled"
              sx={{
                width: "90%",
              }}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
                setError(false);
              }}
              type={"password"}
              label="Password"
            />
            <TextField
              error={error}
              color="secondary"
              size="normal"
              variant="filled"
              sx={{
                width: "90%",
              }}
              onChange={(e) => {
                setData({ ...data, MobileNo: e.target.value });
                setError(false);
              }}
              type={"number"}
              label="Phone Number"
            />
            <FormLabel
              error={error}
              sx={{
                display: "flex",
                width: "83%",
                padding: "10px 12px",
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "4px",
                backgroundColor: "#f2f2f2",
              }}
            >
              <input
                style={{
                  color: "gray",
                  display: "flex",
                  justifyContent: "center",
                }}
                type="file"
                id="upload"
                onChange={(e) => {
                  setData({ ...data, file: e.target.files[0] });
                  setError(false);
                }}
              />
            </FormLabel>
          </Box>
          <LoadingButton
            type="submit"
            loading={loading}
            variant="contained"
            sx={{
              width: "fit-content",
              backgroundColor: "#673ab7",
              color: "white",
              padding: "10px 20px",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#512da8",
              },
            }}
            onClick={handleSubmit}
          >
            Sign Up
          </LoadingButton>
          <Typography variant="body2" fontFamily={"poppins"}>
            have an account?{" "}
            <Link className="Link" to={"/login"}>
              Login
            </Link>
          </Typography>
          <Box sx={{ width: 500 }}>
            {/* <Snackbar
						// anchorOrigin={{ vertical, horizontal }}
						open={open}
						onClose={() => setOpen(false)}
						message={message}
						// key={vertical + horizontal}
					/> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;
