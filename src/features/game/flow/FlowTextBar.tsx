import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material"
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
        {players.length >= 5 ? (
          <Chip
            label={"Ignore the picked card!"}
            variant="filled"
            color={"info"}
          />
        ) : (
          <Chip
            icon={<PersonIcon />}
            label={dealer.name}
            variant="filled"
            color={"success"}
          />
        )}
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
