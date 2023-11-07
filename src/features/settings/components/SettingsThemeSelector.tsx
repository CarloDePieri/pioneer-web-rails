import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import { useTheme } from "@mui/material/styles"
import React from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch } from "../../../app/hooks"
import { toggleTheme } from "../../theme/themeSlice"

export function SettingsThemeSelector() {
  const theme = useTheme()
  const themeVariant = theme.palette.mode
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newThemeVariant: string | null,
  ) => {
    if (newThemeVariant !== null && newThemeVariant !== themeVariant)
      dispatch(toggleTheme())
  }

  return (
    <Box>
      <Stack
        spacing={8}
        direction={"row"}
        sx={{
          justifyContent: "center",
          alignItem: "center",
        }}
      >
        <Stack
          sx={{
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <Typography>
            {themeVariant === "dark"
              ? t("settings.themeDark")
              : t("settings.themeLight")}
          </Typography>
        </Stack>
        <ToggleButtonGroup
          value={themeVariant}
          onChange={handleChange}
          exclusive
          size="large"
          aria-label="Large sizes"
        >
          <ToggleButton value="dark" key="dark">
            <Brightness7Icon />
          </ToggleButton>
          <ToggleButton value="light" key="light">
            <Brightness4Icon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Box>
  )
}
