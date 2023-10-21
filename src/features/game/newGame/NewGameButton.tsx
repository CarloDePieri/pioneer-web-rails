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
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { newGame, selectGameStatus } from "../gameSlice"

export function NewGameButton() {
  const { t } = useTranslation()
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
            {t("newGame.popup.title")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("newGame.popup.body")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t("newGame.popup.cancel")}</Button>
            <Button variant={"contained"} onClick={handleNewGame} autoFocus>
              {t("newGame.popup.confirm")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  } else {
    return <></>
  }
}
