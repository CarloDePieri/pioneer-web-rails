import { Badge, Chip } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../../../app/hooks"
import { selectRound } from "../../gameSlice"

export function FlowRoundChip() {
  const round = useAppSelector(selectRound)
  const { t } = useTranslation()

  return (
    <Badge badgeContent={round} color="primary">
      <Chip label={t("flow.bar.roundChip")} />
    </Badge>
  )
}
