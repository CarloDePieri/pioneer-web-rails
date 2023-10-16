import { Card, CardContent, Stack, Typography } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import React, { PropsWithChildren } from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectPlayers } from "../gameSlice"
import { Card as GameCard } from "./gameDeck"

interface Props extends PropsWithChildren<any> {
  playerId: string
  card: GameCard
}

export function AdvancedPlayingCard({ playerId, card }: Props) {
  const players = useAppSelector(selectPlayers)
  const getPlayerName = (playerId: string): string => {
    return players.filter((player) => player.id === playerId).pop()?.name ?? ""
  }

  return (
    <Card
      elevation={5}
      sx={{
        width: {
          xs: "50vw",
          sm: "20vw",
        },
      }}
    >
      <Stack alignItems={"center"} spacing={2}>
        <CardMedia component="img" image={card.img} alt={card.id} />
        <Typography variant={"caption"} fontWeight={"bold"}>
          {getPlayerName(playerId)}
        </Typography>
      </Stack>
    </Card>
  )
}
