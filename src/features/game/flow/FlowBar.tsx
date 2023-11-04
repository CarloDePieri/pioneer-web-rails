import { Box, Card, Stack } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import React from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectConfigAdvanced } from "../gameSlice"
import { FlowDealerChip } from "./components/FlowDealerChip"
import { FlowRoundChip } from "./components/FlowRoundChip"
import { FlowSecretsButton } from "./components/FlowSecretsButton"
import { FlowTurnChip } from "./components/FlowTurnChip"

export function FlowBar() {
  const theme = useTheme()
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"))
  const advanced = useAppSelector(selectConfigAdvanced)

  if (largeScreen || !advanced)
    return (
      <Card
        elevation={7}
        sx={{
          padding: 4,
          paddingTop: 8,
          maxWidth: { lg: "57vw", xl: "50vw" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          <Stack direction={"row"} spacing={4} sx={{ flexGrow: 1 }}>
            <FlowRoundChip />
            <FlowTurnChip />
            <FlowDealerChip />
          </Stack>
          <FlowSecretsButton />
        </Box>
      </Card>
    )
  else {
    return (
      <Card elevation={7} sx={{ padding: 4, paddingTop: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          <Stack direction={"row"} spacing={4} sx={{ flexGrow: 1 }}>
            <FlowRoundChip />
            <FlowTurnChip />
          </Stack>
          <FlowSecretsButton />
        </Box>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          <FlowDealerChip />
        </Box>
      </Card>
    )
  }
}
