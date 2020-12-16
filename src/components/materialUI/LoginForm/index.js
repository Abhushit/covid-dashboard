import React, { useState } from "react";
import { Paper, makeStyles, Modal, TextField, Button } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { auth } from "../../../firebase";
import { useHistory } from "react-router-dom";
import cogoToast from 'cogo-toast';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  field: {
    margin: `${theme.spacing(1)}px 0`,
  },
  header: {
    margin: `${theme.spacing(2)}px 0px`,
  },
  paperContainer: {
    border: "none",
    padding: theme.spacing(5),
    outline: "none",
    position: "relative",
    textAlign: "center",
  },
  loginIcon: {
    backgroundColor: "#0f4c75",
    padding: theme.spacing(2),
    fontSize: "35px",
    color: "#fff",
    borderRadius: "50%",
    position: "absolute",
    top: "-35px",
    left: "42%",
  },
  submitBtn: {
    margin: `${theme.spacing(3)}px 0`,
  },
  registerBtn: {
    marginTop: theme.spacing(3),
    width: "100%",
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const histroy = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        histroy.push("/dashboard");
        cogoToast.success(`Welcome User`, {
          position: "bottom-right",
        });
      })
      .catch((err) => {
        cogoToast.error("Login Failed", {
          position: "bottom-right",
        });
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) histroy.push("/dashboard");
        cogoToast.success("Register Success", {
          position: "bottom-right",
        });
      })
      .catch((err) => {
        cogoToast.error("Register Failed", {
          position: "bottom-right",
        });
      });
  };

  return (
    <div>
      <Modal open={true} className={classes.root}>
        <Paper className={classes.paperContainer}>
          <PersonOutlineIcon className={classes.loginIcon} />
          <h1 className={classes.header}>Login</h1>
          <form
            className={classes.form}
            onSubmit={handleLogin}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Email Id"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className={classes.field}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.field}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitBtn}
            >
              Login
            </Button>
          </form>
          <p>
            If you have not registered yet. Enter your details & <br /> Please
            Register.
          </p>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.registerBtn}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Paper>
      </Modal>
    </div>
  );
};

export default LoginForm;
