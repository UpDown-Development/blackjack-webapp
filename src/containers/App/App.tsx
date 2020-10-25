import React, { useEffect } from "react";
import blackjackGame from "../../blackjackGame";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { initBlackJack } from "../../redux/actions/blackJackActions";
import { Card } from "../../models/generic";
import './app.css';

function App() {
  const dispatch = useDispatch();
  const blackJackGame = useSelector(
    (state: RootState) => state.BlackJackReducer
  );

  const initGame = () => {
    dispatch(initBlackJack(2));
  };

  useEffect(() => {
    initGame();
  }, []);

  return (
    <div >Hello</div>
  );
}

export default App;
