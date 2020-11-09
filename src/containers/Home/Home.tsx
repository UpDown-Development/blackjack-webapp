import { motion } from "framer-motion";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { GameUser } from "../../models/generic";
import { Link } from "react-router-dom";
import "./home.css";
import { Button } from "@material-ui/core";
import Game from "../../components/Games/Games";

const Home = () => {
  const user: GameUser = useSelector(
    (state: RootState) => state.UserReducer,
    shallowEqual
  );

  const animationVariants = {
    exit: {
      y: -2000,
      transition: {
        duration: 0,
      },
    },
  };

  const showHome = () => {
    if (user.user) {
      return <Game />;
    } else {
      return (
        <motion.div>
          <div className={"logoContainer"}>
            <motion.img
              style={{ height: "300px" }}
              initial={{ x: -3000, y: -500 }}
              animate={{ x: -240, y: 60, rotateZ: 750 }}
              transition={{ type: "tween", duration: 0.7, delay: 0 }}
              src={
                "https://updowncardgames-3c85a.web.app/imgs/cards/cards/diamond.png"
              }
            />
            <motion.img
              style={{ height: "300px" }}
              initial={{ x: -3000, y: -500 }}
              animate={{ x: -80, y: 0, rotateZ: 730 }}
              transition={{ type: "tween", duration: 0.7, delay: 0.5 }}
              src={
                "https://updowncardgames-3c85a.web.app/imgs/cards/cards/club.png"
              }
            />
            <motion.img
              style={{ height: "300px" }}
              initial={{ x: -3000, y: -500 }}
              animate={{ x: 80, y: 0, rotateZ: 700 }}
              transition={{ type: "tween", duration: 0.7, delay: 1 }}
              src={
                "https://updowncardgames-3c85a.web.app/imgs/cards/cards/heart.png"
              }
            />
            <motion.img
              style={{ height: "300px" }}
              initial={{ x: -3000, y: -500 }}
              animate={{ x: 240, y: 60, rotateZ: 680 }}
              transition={{ type: "tween", duration: 0.7, delay: 1.5 }}
              src={
                "https://updowncardgames-3c85a.web.app/imgs/cards/cards/spade.png"
              }
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
            className={"titleContainer"}
          >
            Card.io
          </motion.div>
          <div className={"container"}>
            <Link className={"button"} to={"/login"}>
              <Button variant={"outlined"}>Login</Button>
            </Link>
            <Link className={"button"} to={"/signup"}>
              <Button variant={"outlined"}>Signup</Button>
            </Link>
          </div>
        </motion.div>
      );
    }
  };

  return (
    <motion.div
      variants={animationVariants}
      initial={{ x: 2000 }}
      animate={{ x: 0 }}
      exit="exit"
    >
      {showHome()}
    </motion.div>
  );
};

export default Home;
