import React from 'react'
import {Button, TextField} from "@material-ui/core";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {placeBet} from "../../redux/actions/blackJackActions";
import {RootState} from "../../redux/rootReducer";

const BlackJackBetting = () => {
    const dispatch = useDispatch()
    const playerState = useSelector((state: RootState) => state.BlackJackReducer.players[0])

    const formik = useFormik({
        initialValues: {
            bet: 0,
        },
        onSubmit: values => {
            dispatch(placeBet(values.bet, playerState.wallet))
        }
    })

    return(
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
    )
}

export default BlackJackBetting
