import { Badge, Box, Button, Chip, Divider, Stack } from "@mui/material"
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

export function FlowTextBar() {
  const dispatch = useAppDispatch()
  const dealer = useAppSelector(selectDealer)
  const round = useAppSelector(selectRound)
  const turn = useAppSelector(selectTurn)
  const advanced = useAppSelector(selectConfigAdvanced)
  const players = useAppSelector(selectPlayers)

  const getDealersChip = () => {
    if (players.length >= 5) {
      return (
        <Chip
          label={"Picked card is unavailable"}
          variant="filled"
          color={"info"}
        />
      )
    } else if (advanced && turn === 5) {
      return (
        <Chip
          label={"End round secret cards"}
          variant="filled"
          color={"success"}
        />
      )
    } else if (advanced && turn === 0) {
      return <Chip label={"Dealing..."} variant="filled" color={"success"} />
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
    <React.Fragment>
      {" "}
      <Stack spacing={8} mt={8} direction={"row"}>
        <Badge badgeContent={round} color="primary">
          <Chip label="Round" />
        </Badge>
        <Badge badgeContent={turn} color="secondary">
          <Chip label="Turn" />
        </Badge>
        {getDealersChip()}
        {advanced ? (
          <Button
            variant={"contained"}
            onClick={() => dispatch(openAdvancedGallery())}
          >
            Secret Cards
          </Button>
        ) : (
          <></>
        )}
      </Stack>
      <Box mt={4} mb={8}>
        <Divider variant="fullWidth" />
      </Box>
    </React.Fragment>
  )
}
