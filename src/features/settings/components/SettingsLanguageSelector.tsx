import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
} from "@mui/material"
import i18next from "i18next"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import React from "react"
import { selectLanguage, setLanguage } from "../settingsSlice"
import TranslateIcon from "@mui/icons-material/Translate"

export function SettingsLanguageSelector() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const selectedLanguage = useAppSelector(selectLanguage)

  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const supportedLanguages: string[] =
    i18next.options.resources !== undefined
      ? Object.keys(i18next.options.resources)
      : []

  const getNativeLanguageName = (code: string) => {
    if (i18next.options.resources) {
      const t = i18next.getFixedT(code)
      return t("settings.languageNativeName")
    } else {
      return code
    }
  }

  function handleLanguageChange(event: SelectChangeEvent) {
    const language = event.target.value
    // noinspection JSIgnoredPromiseFromCall
    i18next.changeLanguage(language)
    dispatch(setLanguage(language))
    setOpenSnackbar(true)
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
          <TranslateIcon />
        </Stack>
        <FormControl fullWidth sx={{ minWidth: "50vw" }}>
          <InputLabel id="language-select-label">
            {t("settings.languageLabel")}
          </InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={selectedLanguage}
            label={t("settings.languageLabel")}
            onChange={handleLanguageChange}
          >
            {supportedLanguages.map((code) => {
              return (
                <MenuItem value={code} key={code}>
                  {getNativeLanguageName(code)}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Stack>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setOpenSnackbar(false)
        }}
      >
        <Alert variant="filled" severity="info" sx={{ width: "100%" }}>
          {t("settings.languageChanged")}
        </Alert>
      </Snackbar>
    </Box>
  )
}
