import { Badge, Box, Button, Card, Chip, Stack } from "@mui/material"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { openAdvancedGallery } from "../advanced/advancedSlice"
import {
  selectConfigAdvanced,
  selectDealer,
  selectPlayers,
  selectRound,
  selectTurn,
} from "../gameSlice"
import PersonIcon from "@mui/icons-material/Person"
import RecentActorsIcon from "@mui/icons-material/RecentActors"

export function FlowTextBar() {
  const dispatch = useAppDispatch()
  const dealer = useAppSelector(selectDealer)
  const round = useAppSelector(selectRound)
  const turn = useAppSelector(selectTurn)
  const advanced = useAppSelector(selectConfigAdvanced)
  const players = useAppSelector(selectPlayers)

  const getDealersChip = () => {
    if (advanced && turn === 5) {
      return (
        <Chip label={"End round cards"} variant="filled" color={"success"} />
      )
    } else if (advanced && turn === 0) {
      return <Chip label={"Dealing..."} variant="filled" color={"success"} />
    } else if (players.length >= 5) {
      return <Chip label={"No dealer"} variant="filled" color={"info"} />
    } else {
      return (
        <Chip
          icon={<PersonIcon />}
          label={dealer.name}
          variant="filled"
          color={"success"}
        />
      )
    }
  }

  return (
    <Card elevation={7} sx={{ padding: 4, paddingTop: 8 }}>
      {" "}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        <Stack direction={"row"} spacing={4} sx={{ flexGrow: 1 }}>
          <Badge badgeContent={round} color="primary">
            <Chip label="Round" />
          </Badge>
          <Badge badgeContent={turn} color="secondary">
            <Chip label="Turn" />
          </Badge>
          {getDealersChip()}
        </Stack>
        {advanced ? (
          <Box style={{ marginTop: -6 }}>
            <Button
              variant={"contained"}
              onClick={() => dispatch(openAdvancedGallery())}
              startIcon={<RecentActorsIcon />}
            >
              Secrets
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Stack spacing={8} direction={"row"}></Stack>
    </Card>
  )
}
