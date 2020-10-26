import React from 'react'
import {Button, Paper, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {placeBet} from "../../redux/actions/blackJackActions";
import {RootState} from "../../redux/rootReducer";
import {motion} from "framer-motion";
import styles from "../../containers/SetupGame/setupGame.module.scss";

const BlackJackBetting = () => {
    const dispatch = useDispatch()
    const playerState = useSelector((state: RootState) => state.BlackJackReducer.players[0])

    const formik = useFormik({
        initialValues: {
            bet: 5,
        },
        onSubmit: values => {
            dispatch(placeBet(values.bet, playerState.wallet))
        }
    })

    const animationVariants = {
        exit: {
            x: -2000,
            transition: {
                ease: "easeInOut",
            },
        }
    };

    return(
        <motion.div
            className={styles.container}
            variants={animationVariants}
            initial={{x: -1000}}
            animate={{x: 0}}
            exit="exit"
        >
            <Paper>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        variant={'filled'}
                        id='bet'
                        label='Bet'
                        type='number'
                        value={formik.values.bet}
                        onChange={formik.handleChange}
                    /><Button type="submit">Place Bet</Button>
                </form>
            </Paper>
        </motion.div>
    )
}

export default BlackJackBetting
