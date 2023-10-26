import { Box, Card, Container, Grid, Stack } from "@mui/material"
import { useAppSelector } from "../../app/hooks"
import { AdvancedGallery } from "./advanced/AdvancedGallery"
import { CompanyCardHolder } from "./company/CompanyCardHolder"
import { FlowButtons } from "./flow/FlowButtons"
import { Gallery } from "../gallery/Gallery"
import { FlowTextBar } from "./flow/FlowTextBar"
import { selectConfigAdvanced, selectGameStatus } from "./gameSlice"
import { NewGame } from "./newGame/NewGame"
import { Display } from "./deck/Display"
import { Goals } from "./goals/Goals"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import React from "react"

export function Game() {
  const status = useAppSelector(selectGameStatus)
  const theme = useTheme()
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"))

  const advanced = useAppSelector(selectConfigAdvanced)
  const displayPadding = advanced ? 132 : 112

  if (status === "pre") {
    return <NewGame />
  } else if (largeScreen) {
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
              <FlowTextBar />
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
            <FlowTextBar />
          </Box>
          <Box sx={{ mt: displayPadding, paddingBottom: 16 }}>
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
