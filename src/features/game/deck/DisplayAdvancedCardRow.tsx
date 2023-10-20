import { Box, Stack } from "@mui/material"
import React, { PropsWithChildren } from "react"
import { AdvancedPlayingCard } from "./AdvancedPlayingCard"
import { Card as GameCard } from "./gameDeck"

interface Props extends PropsWithChildren<any> {
  cards: Array<[string, GameCard | undefined]>
}
export function DisplayAdvancedCardRow({ cards }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {cards.map(([playerId, card]) => {
        const secretCard = card as GameCard // I'm sure it's defined
        return (
          <AdvancedPlayingCard
            key={secretCard.id}
            card={secretCard}
            playerId={playerId}
          />
        )
      })}
    </Box>
  )
  // return (
  //   <Stack direction={"row"} spacing={8}>
  //     {cards.map(([playerId, card]) => {
  //       const secretCard = card as GameCard // I'm sure it's defined
  //       return (
  //         <AdvancedPlayingCard
  //           key={secretCard.id}
  //           card={secretCard}
  //           playerId={playerId}
  //         />
  //       )
  //     })}
  //   </Stack>
  // )
}
