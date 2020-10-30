import React from "react";
import { Button, Paper, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { signUpUserEmailAndPassword } from "../../redux/actions/UserActions/userActions";
import { Redirect } from "react-router";
import { GameUser } from "../../models/generic";
import { RootState } from "../../redux/rootReducer";

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
      initial={{ x: 2000 }}
      animate={{ x: 0 }}
      exit="exit"
    >
      {user.user && <Redirect to={"/"} />}
      <Paper>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            placeholder="Email"
            variant="outlined"
            id="email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            placeholder="Password"
            variant="outlined"
            id="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Button type="submit">Signup</Button>
        </form>
      </Paper>
    </motion.div>
  );
};

export default Signup;
