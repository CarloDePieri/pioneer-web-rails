import { Stack } from "@mui/material"
import React from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectConfigAdvanced, selectDisplay, selectTurn } from "../gameSlice"
import { DisplayAdvanced } from "./DisplayAdvanced"
import { PlayingCard } from "./PlayingCard"

export function Display() {
  const display = useAppSelector(selectDisplay)
  const advanced = useAppSelector(selectConfigAdvanced)
  const turn = useAppSelector(selectTurn)

  if (advanced && (turn === 0 || turn === 5)) {
    return <DisplayAdvanced />
  } else {
    return (
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={4}
        justifyContent="center"
        sx={{ minWidth: 0 }}
      >
        {display.map((card) => (
          <PlayingCard key={card.id} card={card} />
        ))}
      </Stack>
    )
  }
}
