import { Card } from "@mui/material"
import React, { PropsWithChildren } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { pick, selectPickedCard, unpick } from "../gameSlice"
import { Card as GameCard } from "./gameDeck"
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
    <Card
      elevation={5}
      sx={{
        boxShadow: isSelected
          ? "0px 3px 5px -1px rgba(25,118,210,0.4),0px 5px 8px 2px rgba(25,118,210,0.24),0px 1px 14px 4px rgba(25,118,210,0.7)"
          : "",
        width: {
          xs: "50vw",
          sm: "20vw",
        },
      }}
    >
      <CardMedia
        className={isSelected ? "pickedCard" : ""}
        component="img"
        image={card.img}
        alt={card.id}
        onClick={togglePick}
      />
    </Card>
  )
}
