import React from "react";
import { Button, Paper, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/UserActions/userActions";

const Login = () => {
  const dispatch = useDispatch();
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
      initial={{ x: 2000 }}
      animate={{ x: 0 }}
      exit="exit"
    >
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
          <Button type="submit">Login</Button>
        </form>
      </Paper>
    </motion.div>
  );
};

export default Login;
