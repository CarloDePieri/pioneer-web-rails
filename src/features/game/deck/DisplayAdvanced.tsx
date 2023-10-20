import { Box, Card, CardContent, Typography } from "@mui/material"
import React from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectSecretCards, selectTurn } from "../gameSlice"
import { AdvancedPlayingCard } from "./AdvancedPlayingCard"
import { Card as GameCard } from "./gameDeck"

export function DisplayAdvanced() {
  const turn = useAppSelector(selectTurn)
  const secretCards = useAppSelector(selectSecretCards)
  const secretCardsArray = Array.from(secretCards.entries())

  if (turn === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant={"h5"} gutterBottom>
            Advanced Hand Card Rule
          </Typography>
          <Typography variant={"body1"}>
            The card for the fifth and final turn of this round has been dealt
            to all players.
          </Typography>
          <Typography variant={"body1"} gutterBottom>
            Check out your secret card using the button above.
          </Typography>
          <Typography variant={"body1"} fontWeight={"bold"}>
            Don't peek other players' card!
          </Typography>
        </CardContent>
      </Card>
    )
  } else if (turn === 5) {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {secretCardsArray.map(([playerId, card]) => {
          const secretCard = card as GameCard // I'm sure it's defined
          return (
            <AdvancedPlayingCard
              sx={{
                margin: 2,
                width: {
                  xs: "50vw",
                  sm: secretCardsArray.length >= 4 ? "14vw" : "19vw",
                },
              }}
              key={secretCard.id}
              card={secretCard}
              playerId={playerId}
            />
          )
        })}
      </Box>
    )
  }
}
