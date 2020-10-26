import React from "react";
import { Route, Switch, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";

// local imports
import SetupGame from "../SetupGame/SetupGame";
import BlackJackGame from "../BlackJackGame/BlackJackGame";
import Home from "../Home/Home";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Switch location={location} key={location.key}>
        <Route exact path={"/"} component={Home} />
        <Route path={"/setup"} component={SetupGame} />
        <Route path={"/play"} component={BlackJackGame} />
      </Switch>
    </AnimatePresence>
  );
}

export default App;
