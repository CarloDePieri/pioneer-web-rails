import { Stack, Container, Card, Divider, Box } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { AppBackdrop } from "../shared/AppBackdrop"
import { SettingsLanguageSelector } from "./components/SettingsLanguageSelector"
import { closeSettings, selectSettingsModalIsOpen } from "./settingsSlice"
import { SettingsThemeSelector } from "./components/SettingsThemeSelector"
import { SettingsHeader } from "./components/SettingsHeader"

export function Settings() {
  const { t } = useTranslation()
  return (
    <AppBackdrop
      openSelector={selectSettingsModalIsOpen}
      closeAction={closeSettings}
    >
      <Container sx={{ marginX: { xs: 8, sm: 32 } }}>
        <Card onClick={(event) => event.stopPropagation()}>
          <SettingsHeader />
          <Divider />
          <Box sx={{ maxHeight: { xs: "80vh", sm: "65vh" }, overflow: "auto" }}>
            <Stack
              spacing={8}
              sx={{
                margin: 8,
                alignItems: "center",
                paddingY: 8,
              }}
            >
              <SettingsLanguageSelector />
              <SettingsThemeSelector />
            </Stack>
            <Divider />
            <Box
              sx={{
                padding: 8,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {t("settings.copyrightNotice")}
              </Box>
              <Box>
                {t("settings.issueReport")}{" "}
                <a href="https://github.com/CarloDePieri/pioneer-web-rails/issues">
                  {t("settings.issueLinkText")}
                </a>
              </Box>
            </Box>
          </Box>
        </Card>
      </Container>
    </AppBackdrop>
  )
}
