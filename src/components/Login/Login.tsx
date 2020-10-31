import React from "react";
import { Button, Paper, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/UserActions/userActions";
import { GameUser } from "../../models/generic";
import { RootState } from "../../redux/rootReducer";
import { Redirect } from "react-router";
import styles from "./login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const user: GameUser = useSelector((state: RootState) => state.UserReducer);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUser(values.email, values.password));
    },
  });

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
      variants={animationVariants}
      initial={{ x: 0, y: -1000 }}
      animate={{ x: 0, y: "40%" }}
      transition={{ type: "spring", duration: 1.2 }}
      exit="exit"
    >
      <div className={styles.container}>
        {user.user && <Redirect to={"/"} />}
        <Paper>
          <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div style={{ marginTop: "50%" }} className={styles.inputContainer}>
              <TextField
                fullWidth
                placeholder="Email"
                variant="outlined"
                id="email"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div
              style={{ marginBottom: "10%" }}
              className={styles.inputContainer}
            >
              <TextField
                fullWidth
                placeholder="Password"
                variant="outlined"
                id="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            <div className={styles.button}>
              <Button variant={"contained"} type="submit">
                Login
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </motion.div>
  );
};

export default Login;
