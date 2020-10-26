import React from "react";
import {Route, Switch, useLocation} from "react-router";
import Home from "../Home/Home";
import {AnimatePresence} from "framer-motion";
import BlackJackGame from "../BlackJackGame/BlackJackGame";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Switch location={location} key={location.key}>
        <Route exact path={"/"} component={Home}/>
        <Route path={"/play"} component={BlackJackGame} />
      </Switch>
    </AnimatePresence>
  );
}

export default App;
