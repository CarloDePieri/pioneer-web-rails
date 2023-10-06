import { Box, Grid } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import * as React from "react"
import "./App.css"
import { useAppSelector } from "./app/hooks"
import { Game } from "./features/game/Game"
import Header from "./features/header/Header"
import { getTheme, selectTheme } from "./features/theme/themeSlice"

function App() {
  return (
    <div>
      <ThemeProvider theme={getTheme(useAppSelector(selectTheme))}>
        <CssBaseline />
        <Header />

        <Grid container spacing={2}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Game />
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </ThemeProvider>
    </div>
  )
}

export default App
