import React from "react";
import { Button, Paper, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  signupOAuth,
  signUpUserEmailAndPassword,
} from "../../redux/actions/UserActions/userActions";
import { Redirect } from "react-router";
import { GameUser } from "../../models/generic";
import { RootState } from "../../redux/rootReducer";
import "../Login/login.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    margin: "15px 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  input: {
    margin: "15px 15px",
  },
  paper: {
    maxHeight: "70vh",
  },
}));

const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user: GameUser = useSelector((state: RootState) => state.UserReducer);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(signUpUserEmailAndPassword(values.email, values.password));
    },
  });

  const handleOAuth = (provider: string) => {
    dispatch(signupOAuth(provider));
  };

  const animationVariants = {
    exit: {
      x: -2000,
      transition: {
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className={"container"}
      variants={animationVariants}
      initial={{ x: 0, y: -1000 }}
      animate={{ x: 0, y: 0 }}
      transition={{ type: "spring", duration: 1.2 }}
      exit="exit"
    >
      <Paper>
        <form onSubmit={formik.handleSubmit}>
          <div className={"inputContainer"}>
            <TextField
              className={classes.input}
              fullWidth
              placeholder="Email"
              variant="outlined"
              id="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <TextField
              className={classes.input}
              fullWidth
              placeholder="Password"
              variant="outlined"
              id="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <Button
              className={classes.button}
              variant={"contained"}
              type="submit"
            >
              Signup
            </Button>
            <div className={"buttonContainer"}>
              <Button
                className={classes.button}
                onClick={() => handleOAuth("GOOGLE")}
                variant={"contained"}
                type="submit"
              >
                Google
              </Button>
              <Button
                className={classes.button}
                onClick={() => handleOAuth("FACEBOOK")}
                variant={"contained"}
                type="submit"
              >
                Facebook
              </Button>
            </div>
          </div>
        </form>
      </Paper>
      {user.user && <Redirect to={"/"} />}
    </motion.div>
  );
};

export default Signup;
