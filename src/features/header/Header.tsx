import * as React from "react"

import { AppBar, Box, Toolbar } from "@mui/material"

import { ToggleThemeButton } from "../theme/ToggleThemeButton"

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>Pioneer Rails</Box>
          <ToggleThemeButton />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
