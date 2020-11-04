import React from "react";
import { Link } from "react-router-dom";
import { loadGameData } from "../../redux/actions/UserActions/userActions";
import { CurrentGame, GameUser } from "../../models/generic";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styles from "./Games.module.scss";

const useStyles = makeStyles((theme) => ({
  button: {
    textDecoration: "none",
  },
  input: {
    margin: "15px 15px",
  },
  paper: {
    maxHeight: "70vh",
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
    backgroundColor: "black",
  },
}));

const Game = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user: GameUser = useSelector(
    (state: RootState) => state.UserReducer,
    shallowEqual
  );
  const loadGame = () => {
    dispatch(loadGameData(user.user.user.uid, CurrentGame.BLACKJACK));
  };
  return (
    <div className={styles.container}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="http://localhost:3000/imgs/cards/cards/aces.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom component="h2">
            Blackjack
          </Typography>
          <Typography component="p">
            Play a game where the goal is to hit 21. Watch the dealer as they
            are looking to get you out!
          </Typography>
        </CardContent>
        <div className={styles.buttonContainer}>
          <CardActions>
            <Link to={"/blackjack"}>
              <Button className={classes.button} onClick={() => loadGame()}>
                Play
              </Button>
            </Link>
          </CardActions>
        </div>
      </Card>
    </div>
  );
};

export default Game;
