import React from 'react'
import {Button, Paper, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {BlackJackState, Card, Player} from "../../models/generic";
import {RootState} from "../../redux/rootReducer";
import {motion} from "framer-motion";
import styles from "../../containers/SetupGame/setupGame.module.scss";
import {dealCard, endPlaying} from "../../redux/actions/blackJackActions";

const BlackJackPlaying = () => {
    const dispatch = useDispatch()
    const blackJackState = useSelector((state: RootState) => state.BlackJackReducer)

    const animationVariants = {
        exit: {
            x: -2000,
            transition: {
                ease: "easeInOut",
            },
        }
    };

    const score = (player: Player) => {
        let hand = player.hand
        let score = 0

        hand.filter(card => card.value !== 11).map((card) => {
            score += card.value
        })

        hand.filter(card => card.value === 11).map((card) => {
            // @ts-ignore
            score += (score + card.value > 21) ? card.secondaryValue : card.value

        })


        return score
    }

    return(
        <motion.div
            className={styles.container}
            variants={animationVariants}
            initial={{x: -1000}}
            animate={{x: 0}}
            exit="exit"
        >
            <Paper style={{minWidth: 800, textAlign: 'center'}}>
                <Typography>Dealer's Hand</Typography>
                {
                    blackJackState.players[1].hand.map((card: Card) => {
                        return card.isFaceUp ? (
                            <img src={card.img}  alt={card.name} style={{height: 120}}/>
                        ) : (
                            <img src={'http://localhost:3000/imgs/cards/backs/back1.png'}  alt={'?'} style={{height: 120}}/>
                        )
                    })
                }
                <Typography>Player's Hand</Typography>
                {
                    blackJackState.players[0].hand.map((card: Card) => {
                        return <img src={card.img}  alt={card.name} style={{height: 120}}/>
                    })
                }
                <br />
                <Typography>{score(blackJackState.players[0])}</Typography>
                <Button onClick={() => dispatch(dealCard(blackJackState.deck, blackJackState.players[0]))}>Hit</Button>
                <Button onClick={() => dispatch(endPlaying())}>Stay</Button>
            </Paper>
        </motion.div>

    )
}

export default BlackJackPlaying
