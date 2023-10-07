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
        <Game />
      </ThemeProvider>
    </div>
  )
}

export default App
