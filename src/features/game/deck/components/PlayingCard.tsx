import { Card, SxProps } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import React, { PropsWithChildren } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { pick, selectPickedCard, unpick } from "../../gameSlice"
import { GameCard } from "../gameDeck"
import CardMedia from "@mui/material/CardMedia"

interface Props extends PropsWithChildren<any> {
  card: GameCard
  sx?: SxProps
}

export function PlayingCard({ card, sx }: Props) {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const selectedCard = useAppSelector(selectPickedCard)
  const isSelected = selectedCard?.id === card.id

  function getShadow() {
    let color, spread
    if (theme.palette.mode === "dark") {
      spread = "8px"
      color = "255,255,255"
    } else {
      spread = "4px"
      color = "25,118,210"
    }
    return `0px 3px 5px -1px rgba(${color},0.4),0px 5px 8px 2px rgba(${color},0.24),0px 1px 14px ${spread} rgba(${color},0.7)`
  }

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
        boxShadow: isSelected ? getShadow() : "",
        transform: isSelected ? "translateY(4%)" : "",
        width: {
          xs: "40vw",
          sm: "20vw",
        },
        marginBottom: {
          xs: 8,
          sm: 0,
        },
        marginRight: {
          xs: 4,
          sm: 0,
        },
        marginLeft: {
          xs: 4,
          sm: 0,
        },
        ...sx,
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
