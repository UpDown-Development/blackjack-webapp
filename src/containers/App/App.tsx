import React from "react";
import { Route, Switch, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";

// local imports
import SetupGame from "../SetupGame/SetupGame";
import BlackjackHome from "../BlackjackHome/BlackjackHome";
import { BlackJackGame } from "../BlackJackGame/BlackJackGame";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";
import Home from "../Home/Home";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Switch location={location} key={location.key}>
        <Route exact path={"/"} component={Home} />
        <Route path={"/blackjack"} component={BlackjackHome} />
        <Route path={"/setup"} component={SetupGame} />
        <Route path={"/play"} component={BlackJackGame} />
        <Route path={"/login"} component={Login} />
        <Route path={"/signup"} component={Signup} />
      </Switch>
    </AnimatePresence>
  );
}

export default App;
