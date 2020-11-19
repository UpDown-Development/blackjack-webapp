import { motion } from "framer-motion";
import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.div>
      <AppBar>
        <Toolbar>
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Signup</Link>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Navbar;
