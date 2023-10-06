import { Box, Card } from "@mui/material"
import React, { PropsWithChildren } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { pick, selectPickedCard, unpick } from "../gameSlice"
import { Card as GameCard } from "./gameDeck"
import Paper from "@mui/material/Paper"
import CardMedia from "@mui/material/CardMedia"

interface Props extends PropsWithChildren<any> {
  card: GameCard
}

export function PlayingCard({ card }: Props) {
  const dispatch = useAppDispatch()
  const selectedCard = useAppSelector(selectPickedCard)
  const isSelected = selectedCard?.id === card.id

  const togglePick = () => {
    if (isSelected) {
      dispatch(unpick())
    } else {
      dispatch(pick(card.id))
    }
  }

  return (
    <React.Fragment>
      <Card
        className={isSelected ? "pickedCard" : ""}
        elevation={isSelected ? 1 : 5}
        sx={{
          width: {
            xs: "50vw",
            sm: "20vw",
          },
        }}
      >
        <CardMedia
          component="img"
          image={card.img}
          alt={card.id}
          onClick={togglePick}
        />
      </Card>
    </React.Fragment>
  )
}
