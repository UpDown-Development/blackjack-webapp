import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import {initBlackJack} from "../../redux/actions/blackJackActions";
import pips from '../../images/resources/4_pips.png';
import styles  from './app.module.scss';

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
    <div className={styles.container}>
      <img className={styles.pips} src={pips}/>
      <h1 className={styles.title}>Blackjack</h1>
      <button className={styles.button}>Play</button>
    </div>
  );
}

export default App;
