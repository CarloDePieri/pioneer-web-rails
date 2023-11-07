import { Stack, Container, Card, Divider, Box } from "@mui/material"
import React from "react"
import { AppBackdrop } from "../shared/AppBackdrop"
import { closeSettings, selectSettingsModalIsOpen } from "./settingsSlice"
import { SettingsThemeSelector } from "./components/SettingsThemeSelector"
import { SettingsHeader } from "./components/SettingsHeader"

export function Settings() {
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
              }}
            >
              <SettingsThemeSelector />
            </Stack>
          </Box>
        </Card>
      </Container>
    </AppBackdrop>
  )
}
