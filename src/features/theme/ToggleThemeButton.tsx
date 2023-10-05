import { useTheme } from "@mui/material/styles"
import * as React from "react"
import IconButton from "@mui/material/IconButton"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import { useAppDispatch } from "../../app/hooks"
import { toggleTheme } from "./themeSlice"

export function ToggleThemeButton() {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={() => dispatch(toggleTheme())}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  )
}
