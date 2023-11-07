import IconButton from "@mui/material/IconButton"
import React from "react"
import SettingsIcon from "@mui/icons-material/Settings"
import { useAppDispatch } from "../../app/hooks"
import { openSettings } from "./settingsSlice"

export function SettingsButton() {
  const dispatch = useAppDispatch()

  return (
    <IconButton onClick={() => dispatch(openSettings())} color="inherit">
      <SettingsIcon />
    </IconButton>
  )
}
