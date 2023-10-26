import { Box, Container, Stack } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import React from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectConfigAdvanced, selectDisplay, selectTurn } from "../gameSlice"
import { DisplayAdvanced } from "./components/DisplayAdvanced"
import { PlayingCard } from "./components/PlayingCard"

export function Display() {
  const display = useAppSelector(selectDisplay)
  const advanced = useAppSelector(selectConfigAdvanced)
  const turn = useAppSelector(selectTurn)
  const theme = useTheme()
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"))

  if (advanced && (turn === 0 || turn === 5)) {
    return <DisplayAdvanced />
  } else {
    if (largeScreen) {
      return (
        <Stack
          direction={{ xs: "row", sm: "row" }}
          spacing={4}
          justifyContent="center"
        >
          {display.map((card) => (
            <PlayingCard key={card.id} card={card} />
          ))}
        </Stack>
      )
    } else {
      return (
        <React.Fragment>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {display.slice(0, 2).map((card) => (
              <PlayingCard key={card.id} card={card} />
            ))}
          </Box>
          <Box
            sx={{
              paddingLeft: 7,
            }}
          >
            {display.slice(2, 3).map((card) => (
              <PlayingCard key={card.id} card={card} />
            ))}
          </Box>
        </React.Fragment>
      )
    }
  }
}
