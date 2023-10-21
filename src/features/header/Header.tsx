import * as React from "react"

import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material"
import { NewGameButton } from "../game/newGame/NewGameButton"

import { ToggleThemeButton } from "../theme/ToggleThemeButton"
import { LanguageSwitcher } from "./LanguageSwitcher"

export default function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="button" ml={8}>
            Pioneer Web Rails
          </Typography>
        </Box>
        <Stack direction={"row"} spacing={8} mr={8}>
          <NewGameButton />
          <LanguageSwitcher />
          <ToggleThemeButton />
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
