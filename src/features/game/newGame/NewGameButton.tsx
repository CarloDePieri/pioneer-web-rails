import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import * as React from "react"
import IconButton from "@mui/material/IconButton"
import GamepadIcon from "@mui/icons-material/Gamepad"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { newGame, selectGameStatus } from "../gameSlice"

export function NewGameButton() {
  const dispatch = useAppDispatch()
  const gameStatus = useAppSelector(selectGameStatus)

  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleNewGame = () => {
    handleClose()
    dispatch(newGame())
  }

  if (gameStatus !== "pre") {
    return (
      <div>
        {/* ACTUAL BUTTON */}
        <IconButton sx={{ ml: 1 }} onClick={handleClickOpen} color="inherit">
          <GamepadIcon />
        </IconButton>

        {/* CONFIRMATION DIALOG */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Start a new game?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The current game will be discarded!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleNewGame} autoFocus>
              Start New Game
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  } else {
    return <></>
  }
}
