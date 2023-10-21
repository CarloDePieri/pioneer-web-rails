import { Card, Stack, SxProps, Typography } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import React, { PropsWithChildren } from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectPlayers } from "../gameSlice"
import { Card as GameCard } from "./gameDeck"

interface Props extends PropsWithChildren<any> {
  playerId: string
  card: GameCard
  sx?: SxProps
}

export function AdvancedPlayingCard({ playerId, card, sx }: Props) {
  const players = useAppSelector(selectPlayers)
  const getPlayerName = (playerId: string): string => {
    return players.filter((player) => player.id === playerId).pop()?.name ?? ""
  }

  return (
    <Card elevation={5} sx={sx}>
      <Stack alignItems={"center"} spacing={2}>
        <CardMedia component="img" image={card.img} alt={card.id} />
        <Typography variant={"caption"} fontWeight={"bold"}>
          {getPlayerName(playerId)}
        </Typography>
      </Stack>
    </Card>
  )
}
