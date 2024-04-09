import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import { authApi } from "../../API";
import { User, UserLoginRequest } from "../../API/generated";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const defaultData = { email: "", password: "" };

const Login: React.FC = () => {
  const [data, setData] = useState(defaultData);
  const navigate = useNavigate();

  const onValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!data.email || !data.password) {
      alert("Please fill all the fields.");
      return;
    }

    const user: UserLoginRequest = {
      email: data.email,
      password: data.password,
    };

    const response = await authApi.authLoginPost(user);
    if (response.data.accessToken) {
      localStorage.setItem("x-token", response.data.accessToken);
      axios.interceptors.request.use((config) => {
        const token = localStorage.getItem("x-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
      navigate(-1);
    }
  };

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{}}>
          <TextField
            margin="dense"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{ style: { margin: "6px 0px" } }}
            value={data.email}
            onChange={(e) => onValueChange(e)}
          />
          <TextField
            margin="dense"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{ style: { margin: "6px 0px" } }}
            value={data.password}
            onChange={(e) => onValueChange(e)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
