import {
  Badge,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material"
import React from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectDealer, selectRound, selectTurn } from "../gameSlice"
import PersonIcon from "@mui/icons-material/Person"

export function FlowTextBar() {
  const dealer = useAppSelector(selectDealer)
  const round = useAppSelector(selectRound)
  const turn = useAppSelector(selectTurn)

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
        <Chip
          icon={<PersonIcon />}
          label={dealer.name}
          variant="filled"
          color={"success"}
        />
      </Stack>
      <Box mt={4} mb={8}>
        <Divider variant="fullWidth" />
      </Box>
    </React.Fragment>
  )
}
