import PersonIcon from "@mui/icons-material/Person"
import { Chip } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../../../app/hooks"
import {
  selectConfigAdvanced,
  selectDealer,
  selectPlayers,
  selectTurn,
} from "../../gameSlice"

/**
 * Chip that displays the dealer's name or a message if there is no dealer.
 *
 * @returns {JSX.Element} The JSX code for the component
 */
export function FlowDealerChip() {
  const { t } = useTranslation()
  const turn = useAppSelector(selectTurn)
  const advanced = useAppSelector(selectConfigAdvanced)
  const dealer = useAppSelector(selectDealer)
  const players = useAppSelector(selectPlayers)

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
