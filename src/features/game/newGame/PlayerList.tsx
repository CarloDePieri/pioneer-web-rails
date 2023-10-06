import {
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material"
import IconButton from "@mui/material/IconButton"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectPlayers, updatePlayers } from "../gameSlice"
import DeleteIcon from "@mui/icons-material/Delete"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import { GridHeading } from "./GridHeading"
// noinspection SpellCheckingInspection
import { v4 as uuidv4 } from "uuid"

export function PlayerList() {
  const players = useAppSelector(selectPlayers)
  const dispatch = useAppDispatch()

  const renamePlayer =
    (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updatePlayers(
          players.map((player) => {
            if (player.id === id) {
              return { ...player, name: event.target.value }
            } else {
              return player
            }
          }),
        ),
      )
    }

  const addPlayer = () => {
    dispatch(updatePlayers([...players, { name: "", id: uuidv4() }]))
  }

  const deletePlayer = (id: string) => () => {
    dispatch(updatePlayers(players.filter((player) => player.id !== id)))
  }

  return (
    <React.Fragment>
      <GridHeading size={"h6"}>Players</GridHeading>
      {players.length > 0 ? (
        players.map((player, index) => {
          return (
            <Grid container item xs={12} key={player.id}>
              <Grid item xs={1} />
              <Grid item xs={10}>
                <FormControl variant="standard" style={{ width: "100%" }}>
                  <InputLabel htmlFor={"player-input-" + player.id}>
                    Player {index + 1}
                  </InputLabel>
                  <Input
                    id={"player-input-" + player.id}
                    type="text"
                    value={player.name}
                    onChange={renamePlayer(player.id)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          tabIndex={-1}
                          onClick={deletePlayer(player.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={1} />
            </Grid>
          )
        })
      ) : (
        /* Warning if no player exists */
        <Grid container item xs={12}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Typography
              variant="subtitle1"
              align={"center"}
              color={"error"}
              gutterBottom
            >
              You need at least a player to start!
            </Typography>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      )}
      {/* Add new Player button */}
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Button
          variant={"text"}
          style={{ width: "100%" }}
          onClick={addPlayer}
          startIcon={<PersonAddAlt1Icon />}
        >
          Add Player
        </Button>
      </Grid>
      <Grid item xs={2} />
    </React.Fragment>
  )
}
