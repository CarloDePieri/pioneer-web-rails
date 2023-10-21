import { Badge, Box, Button, Card, Chip, Stack } from "@mui/material"
import i18next from "i18next"
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
import { useTranslation, Trans } from "react-i18next"

export function FlowTextBar() {
  const dispatch = useAppDispatch()
  const dealer = useAppSelector(selectDealer)
  const round = useAppSelector(selectRound)
  const turn = useAppSelector(selectTurn)
  const advanced = useAppSelector(selectConfigAdvanced)
  const players = useAppSelector(selectPlayers)
  const { t } = useTranslation()

  const getDealersChip = () => {
    if (advanced && turn === 5) {
      return (
        <Chip
          label={t("advanced.flow.lastTurnChip")}
          variant="filled"
          color={"success"}
        />
      )
    } else if (advanced && turn === 0) {
      return (
        <Chip
          label={t("advanced.flow.firstTurnChip")}
          variant="filled"
          color={"success"}
        />
      )
    } else if (players.length >= 5) {
      return (
        <Chip
          label={t("flow.bar.noDealerChip")}
          variant="filled"
          color={"info"}
        />
      )
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
            <Chip label={t("flow.bar.roundChip")} />
          </Badge>
          <Badge badgeContent={turn} color="secondary">
            <Chip label={t("flow.bar.turnChip")} />
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
              {t("advanced.flow.secretsButton")}
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
