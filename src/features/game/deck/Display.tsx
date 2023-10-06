import { Stack } from "@mui/material"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { images } from "../../../res/images"
import { pick, selectDisplay, selectPickedCard, unpick } from "../gameSlice"
import { PlayingCard } from "./PlayingCard"

export function Display() {
  const dispatch = useAppDispatch()
  const display = useAppSelector(selectDisplay)
  const selectedCard = useAppSelector(selectPickedCard)
  const getColor = (id: string) => (id === selectedCard?.id ? "red" : "black")

  const togglePick = (id: string) => {
    if (id === selectedCard?.id) {
      dispatch(unpick())
    } else {
      dispatch(pick(id))
    }
  }

  return (
    <div>
      <p>Display:</p>

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
    </div>
  )
}
