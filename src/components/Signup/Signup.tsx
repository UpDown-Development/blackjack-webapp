import React from "react";
import { Button, Paper, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { signUpUserEmailAndPassword } from "../../redux/actions/UserActions/userActions";
import { Redirect } from "react-router";
import { GameUser } from "../../models/generic";
import { RootState } from "../../redux/rootReducer";
import styles from "../Login/login.module.scss";
import { checkShouldInheritVariant } from "framer-motion/types/motion/utils/should-inherit-variant";

const Signup = () => {
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
                Signup
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </motion.div>
  );
};

export default Signup;
