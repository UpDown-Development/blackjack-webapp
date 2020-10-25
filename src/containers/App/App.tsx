import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {initBlackJack} from "../../redux/actions/blackJackActions";
import pips from "../../images/resources/4_pips.png";
import styles from "./app.module.scss";

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
    <div>
      <div className={styles.container}>
        <img className={styles.pips} src={pips}/>
        <h1 className={styles.title}>Blackjack</h1>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>Stats</button>
        <button className={styles.button}>Play</button>
        <button style={{fontSize: '22px'}} className={styles.button}>Customize</button>
      </div>
    </div>

  );
}

export default App;
