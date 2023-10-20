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

function isNameTooShort(name: string): boolean {
  return name.length === 0
}
function isNameTooLong(name: string): boolean {
  return name.length > 16
}
export function validName(name: string): boolean {
  return !(isNameTooShort(name) || isNameTooLong(name))
}

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

  const labelMessage = (name: string, index: number) => {
    let error
    if (isNameTooLong(name)) {
      error = " - Name too long!"
    } else if (isNameTooShort(name)) {
      error = " - Insert the player name!"
    } else {
      error = ""
    }
    return "Player " + (index + 1) + error
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
                  <InputLabel
                    error={isNameTooLong(player.name)}
                    htmlFor={"player-input-" + player.id}
                  >
                    {labelMessage(player.name, index)}
                  </InputLabel>
                  <Input
                    error={isNameTooLong(player.name)}
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
          disabled={players.length >= 8}
          variant={"text"}
          style={{ width: "100%" }}
          onClick={addPlayer}
          startIcon={<PersonAddAlt1Icon />}
        >
          {players.length >= 8 ? "Maximum player count reached!" : "Add Player"}
        </Button>
      </Grid>
      <Grid item xs={2} />
    </React.Fragment>
  )
}
