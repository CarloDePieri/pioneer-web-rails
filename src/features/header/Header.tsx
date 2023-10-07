import * as React from "react"

import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import { NewGameButton } from "../game/newGame/NewGameButton"

import { ToggleThemeButton } from "../theme/ToggleThemeButton"

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="button" ml={8}>
              Pioneer Rails
            </Typography>
          </Box>
          <NewGameButton />
          <ToggleThemeButton />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
