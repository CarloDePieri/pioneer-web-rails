import { Card, CardContent, Stack, Typography } from "@mui/material"
import React from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectSecretCards, selectTurn } from "../gameSlice"
import { AdvancedPlayingCard } from "./AdvancedPlayingCard"
import { DisplayAdvancedCardRow } from "./DisplayAdvancedCardRow"
import { PlayingCard } from "./PlayingCard"
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
            The card for the fifth and final turn of this round has been
            secretly dealt to all players.
          </Typography>
          <Typography variant={"body1"} gutterBottom>
            Check out your card using the button above.
          </Typography>
          <Typography variant={"body1"} fontWeight={"bold"}>
            Don't peek other players' card!
          </Typography>
        </CardContent>
      </Card>
    )
  } else if (turn === 5) {
    if (secretCards.size > 4) {
      return (
        <React.Fragment>
          <Stack spacing={8}>
            <DisplayAdvancedCardRow cards={secretCardsArray.slice(0, 4)} />
            <DisplayAdvancedCardRow
              cards={secretCardsArray.slice(4, secretCards.size)}
            />
          </Stack>
        </React.Fragment>
      )
    } else {
      return <DisplayAdvancedCardRow cards={secretCardsArray} />
    }
  }
}
