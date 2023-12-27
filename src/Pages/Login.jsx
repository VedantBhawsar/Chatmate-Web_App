import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../Context/AuthContext";
import { Box, Divider, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { isEmail } from "@formiz/validations";
import Snackbar from "@mui/material/Snackbar";

const Login = () => {
  const [user, setUser] = useState({
    email: "example2@gmail.com",
    password: "password",
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (isEmail(user.email)) {
      try {
        await signInWithEmailAndPassword(auth, user.email, user.password).then(
          (res) => {
            setCurrentUser(res.user);
            localStorage.setItem("password", {
              user,
            });
          }
        );
        setMessage("Login Successfully ");
        navigate("/");
      } catch (error) {
        console.log();
        setError(true);
        setMessage(`Error: ${error.message}`);
      } finally {
        setLoading(false);
        setOpen(true);
      }
    } else {
      setError(true);
    }
  };

  // const handleKey = (e) => {
  //   e.code === "Enter" && handleSubmit();
  // };

  return (
    <Box
      className="Login Page"
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4527a0",
        // backgroundColor: "#669bbc",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
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
            Login
          </Typography>
        </Box>
        <Divider
          sx={{
            width: "80%",
            display: "flex",
            fontWeight: "bold",
          }}
        />
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          gap={4}
        >
          <TextField
            color="secondary"
            size="normal"
            label="Email"
            variant="filled"
            sx={{
              width: "80%",
            }}
            type={"email"}
            value={user.email}
            error={error}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
              setError(false);
            }}
          />
          <TextField
            color="secondary"
            size="normal"
            label="Password"
            variant="filled"
            type={"password"}
            value={user.password}
            error={error}
            style={{
              borderRadius: "50px",
            }}
            sx={{
              width: "80%",
            }}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
              setError(false);
            }}
          />
        </Box>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
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
        >
          Login
        </LoadingButton>
        <Typography variant="body2" fontFamily={"poppins"}>
          Don't have account?{" "}
          <Link className="Link" to={"/register"}>
            Register
          </Link>
        </Typography>
        <Box sx={{ width: 500 }}>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            message={message}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
