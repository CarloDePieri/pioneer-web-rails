import { Badge, Chip } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../../../app/hooks"
import { selectTurn } from "../../gameSlice"

export function FlowTurnChip() {
  const turn = useAppSelector(selectTurn)
  const { t } = useTranslation()

  return (
    <Badge badgeContent={turn} color="secondary">
      <Chip label={t("flow.bar.turnChip")} />
    </Badge>
  )
}
