import { Box, Card, Container, Grid, Stack } from "@mui/material"
import { useAppSelector } from "../../app/hooks"
import { LayoutWarning } from "../settings/LayoutWarning"
import useIsLargeScreen from "../theme/useIsLargeScreen"
import { AdvancedGallery } from "./advanced/AdvancedGallery"
import { CompanyCardHolder } from "./company/CompanyCardHolder"
import { FlowButtons } from "./flow/FlowButtons"
import { Gallery } from "../gallery/Gallery"
import { FlowBar } from "./flow/FlowBar"
import {
  selectConfigAdvanced,
  selectConfigCompany,
  selectGameStatus,
} from "./gameSlice"
import { NewGame } from "./newGame/NewGame"
import { Display } from "./deck/Display"
import { Goals } from "./goals/Goals"
import React from "react"

export function Game() {
  const status = useAppSelector(selectGameStatus)
  const isLargeScreen = useIsLargeScreen()

  const advanced = useAppSelector(selectConfigAdvanced)
  const company = useAppSelector(selectConfigCompany)
  const displayPadding = () => {
    let p = 112
    if (advanced) p += 20
    if (!company) p += 20
    return p
  }

  if (status === "pre") {
    return <NewGame />
  } else if (isLargeScreen) {
    return (
      <React.Fragment>
        <Gallery />
        <AdvancedGallery />
        <Grid container spacing={2} mt={4} mb={8} height={"100%"}>
          <Grid item xs={2}>
            <CompanyCardHolder />
            <Goals />
          </Grid>
          <Grid item xs={8}>
            <Box position={"fixed"} sx={{ width: "66vw", zIndex: 10 }}>
              <FlowBar />
            </Box>
            <Container>
              <Box mt={36}>
                <Display />
              </Box>
            </Container>
          </Grid>
          <Grid item xs={2}>
            <Box position={"fixed"} pl={16}>
              <FlowButtons />
            </Box>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  } else
    return (
      <Stack>
        <LayoutWarning />
        <Gallery />
        <AdvancedGallery />
        <Container>
          <Box position={"fixed"} sx={{ zIndex: 10, mr: 4 }}>
            <Card
              elevation={5}
              sx={{ padding: 4, marginTop: 8, marginBottom: 4 }}
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                direction={"row"}
                spacing={8}
              >
                <CompanyCardHolder />
                <Goals />
              </Stack>
            </Card>
            <FlowBar />
          </Box>
          <Box sx={{ mt: displayPadding(), paddingBottom: 16 }}>
            <Container>
              <Display />
            </Container>
          </Box>
          <Box
            sx={{
              position: "fixed",
              bottom: 32,
              right: 0,
            }}
          >
            <FlowButtons />
          </Box>
        </Container>
      </Stack>
    )
}
