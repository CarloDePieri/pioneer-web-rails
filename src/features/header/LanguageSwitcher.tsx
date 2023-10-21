import FlagIcon from "@mui/icons-material/Flag"
import { Alert } from "@mui/material"
import { Snackbar } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import i18next from "i18next"
import * as React from "react"
import { useTranslation } from "react-i18next"

export function LanguageSwitcher() {
  const { t } = useTranslation()
  function toggleLang() {
    if (i18next.language === "it-IT") {
      // noinspection JSIgnoredPromiseFromCall
      i18next.changeLanguage("en-US")
    } else {
      // noinspection JSIgnoredPromiseFromCall
      i18next.changeLanguage("it-IT")
    }
    setOpen(true)
  }
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <IconButton onClick={toggleLang} color="inherit">
        <FlagIcon />
      </IconButton>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          setOpen(false)
        }}
      >
        <Alert variant="filled" severity="info" sx={{ width: "100%" }}>
          {t("settings.languageChanged")}
        </Alert>
      </Snackbar>
    </React.Fragment>
  )
}
