import React, {useEffect} from "react";
import blackjackGame from "../blackjackGame";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/rootReducer";
import {initBlackJack} from "../redux/actions/blackJackActions";
import {Card} from "../models/generic";

function App() {
  const dispatch = useDispatch();
  const blackJackGame = useSelector((state: RootState) => state.BlackJackReducer);

  const initGame = () => {
    dispatch(initBlackJack(2));
  }

  useEffect(() => {
    initGame()
  }, [])

  return (
    <div>
      {blackJackGame.deck.map((item: Card, key: number) => {
        return (
            <img
              style={{width: "70px", height: "auto"}}
              key={key}
              src={item.img} />
        );
      })}
    </div>
  );
}

export default App;
