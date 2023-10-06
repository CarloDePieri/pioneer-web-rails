import { Button, Grid } from "@mui/material"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  deal,
  dealSecrets,
  init,
  newRound,
  selectConfigAdvanced,
  selectPlayers,
} from "../gameSlice"

export function NewGameStartButton() {
  const dispatch = useAppDispatch()
  const players = useAppSelector(selectPlayers)
  const advanced = useAppSelector(selectConfigAdvanced)

  function startGame() {
    if (!advanced) {
      dispatch(init())
      dispatch(newRound())
      dispatch(deal())
    } else {
      dispatch(init())
      dispatch(newRound())
      dispatch(dealSecrets())
    }
  }

  return (
    <React.Fragment>
      <Grid item xs={1} />
      <Grid item xs={10} mt={16}>
        <Button
          variant="contained"
          color="success"
          style={{ width: "100%", minHeight: "50px" }}
          disabled={players.length === 0}
          onClick={startGame}
        >
          Start a new game!
        </Button>
      </Grid>
      <Grid item xs={1} mt={16} />
    </React.Fragment>
  )
}
