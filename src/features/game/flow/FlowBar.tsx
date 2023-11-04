import { Box, Card, Stack } from "@mui/material"
import React from "react"
import { useAppSelector } from "../../../app/hooks"
import useIsLargeScreen from "../../theme/useIsLargeScreen"
import { selectConfigAdvanced } from "../gameSlice"
import { FlowDealerChip } from "./components/FlowDealerChip"
import { FlowRoundChip } from "./components/FlowRoundChip"
import { FlowSecretsButton } from "./components/FlowSecretsButton"
import { FlowTurnChip } from "./components/FlowTurnChip"

export function FlowBar() {
  const isLargeScreen = useIsLargeScreen()
  const advanced = useAppSelector(selectConfigAdvanced)

  if (isLargeScreen || !advanced)
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
