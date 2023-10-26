import RecentActorsIcon from "@mui/icons-material/RecentActors"
import { Box, Button } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { openAdvancedGallery } from "../../advanced/advancedSlice"
import { selectConfigAdvanced } from "../../gameSlice"

export function FlowSecretsButton() {
  const dispatch = useAppDispatch()
  const advanced = useAppSelector(selectConfigAdvanced)
  const { t } = useTranslation()

  if (advanced)
    return (
      <Box style={{ marginTop: -6 }}>
        <Button
          variant={"contained"}
          onClick={() => dispatch(openAdvancedGallery())}
          startIcon={<RecentActorsIcon />}
        >
          {t("advanced.flow.secretsButton")}
        </Button>
      </Box>
    )
  else return <></>
}
