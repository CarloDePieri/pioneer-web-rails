import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material"
import * as React from "react"
import { useTranslation } from "react-i18next"
import ScreenRotationIcon from "@mui/icons-material/ScreenRotation"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  disableHideLayoutWarning,
  selectHideLayoutWarning,
} from "./settingsSlice"

export function LayoutWarning() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [open, setOpen] = React.useState(true)
  const isHideLayoutWarningDisabled = useAppSelector(selectHideLayoutWarning)

  const handleClose = () => {
    setOpen(false)
  }
  const handleCloseAndHide = () => {
    setOpen(false)
    dispatch(disableHideLayoutWarning())
  }

  if (!isHideLayoutWarningDisabled) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Stack spacing={8} alignItems={"center"}>
          <DialogTitle id="alert-dialog-title">
            {t("settings.layoutWarning.title")}
          </DialogTitle>
        </Stack>
        <DialogContent>
          <Stack spacing={8} alignItems={"center"}>
            <ScreenRotationIcon fontSize={"large"} />
            <DialogContentText id="alert-dialog-description">
              {t("settings.layoutWarning.body")}
            </DialogContentText>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} onClick={handleCloseAndHide} autoFocus>
            {t("settings.layoutWarning.closeAndHide")}
          </Button>
          <Button variant={"contained"} onClick={handleClose}>
            {t("settings.layoutWarning.close")}
          </Button>
        </DialogActions>
      </Dialog>
    )
  } else {
    return <></>
  }
}
