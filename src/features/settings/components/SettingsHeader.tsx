import CloseIcon from "@mui/icons-material/Close"
import { Box, Typography } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import React from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch } from "../../../app/hooks"
import { closeSettings } from "../settingsSlice"

export function SettingsHeader() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  return (
    <Box sx={{ margin: 8, display: "flex", flexDirection: "row" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant={"h4"}>{t("settings.title")}</Typography>
      </Box>
      <Box>
        <IconButton
          aria-label="close"
          onClick={() => dispatch(closeSettings())}
          sx={{
            marginTop: -4,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon fontSize={"large"} />
        </IconButton>
      </Box>
    </Box>
  )
}
