import { Card, CardContent, Stack } from "@mui/material"
import React from "react"
import { AppBackdrop } from "../../shared/AppBackdrop"
import useIsLargeScreen from "../../theme/useIsLargeScreen"
import { AdvancedGalleryGrid } from "./AdvancedGalleryGrid"
import { AdvancedGalleryHiddenCard } from "./AdvancedGalleryHiddenCard"
import { AdvancedGalleryPlayerSelector } from "./AdvancedGalleryPlayerSelector"
import {
  closeAdvancedGallery,
  selectAdvancedGalleryOpen,
} from "./advancedSlice"

export function AdvancedGallery() {
  const isLargeScreen = useIsLargeScreen()

  return (
    <AppBackdrop
      openSelector={selectAdvancedGalleryOpen}
      closeAction={closeAdvancedGallery}
    >
      <AdvancedGalleryGrid>
        {isLargeScreen ? (
          <Card
            style={{ width: "63vw", height: "80vh", display: "flex" }}
            onClick={(event) => event.stopPropagation()}
          >
            <AdvancedGalleryHiddenCard />
            <CardContent sx={{ width: "50vw" }}>
              <AdvancedGalleryPlayerSelector />
            </CardContent>
          </Card>
        ) : (
          <Card
            sx={{ paddingBottom: 8 }}
            onClick={(event) => event.stopPropagation()}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={8}
            >
              <AdvancedGalleryHiddenCard style={{ width: "100%" }} />
              <CardContent sx={{ width: "100%" }}>
                <AdvancedGalleryPlayerSelector />
              </CardContent>
            </Stack>
          </Card>
        )}
      </AdvancedGalleryGrid>
    </AppBackdrop>
  )
}
