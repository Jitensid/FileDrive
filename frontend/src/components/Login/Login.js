import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LoginAxiosApiInstance from "../axios_instance";
import { Link as RouterLink } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const classes = useStyles();

  const initialState = {
    username: "",
    password: "",
    errorMessage: "",
  };

  const [formState, setformState] = useState(initialState);

  const message = formState.errorMessage === "" ? false : true;

  const handleSubmit = (e) => {
    e.preventDefault();

    LoginAxiosApiInstance.LoginAxiosApiInstance.post("/api/token/", {
      username: formState.username,
      password: formState.password,
    }).catch((error) => {
      // alert(JSON.stringify(error.response.data.detail));
      setformState({
        username: "",
        password: "",
        errorMessage: JSON.stringify(error.response.data.detail),
      });
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setformState({
      ...formState,
      [e.target.name]: value,
    });
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            type="text"
            autoComplete="text"
            value={formState.username}
            onChange={handleChange}
            InputLabelProps={{ required: false }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formState.password}
            onChange={handleChange}
            InputLabelProps={{ required: false }}
          />

          {message ? (
            <Alert severity="error"> {formState.errorMessage} </Alert>
          ) : null}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container direction="row-reverse">
            <Grid item>
              <RouterLink to="/register">
                <Link variant="body2">{"Don't have an account? Sign Up"}</Link>
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
