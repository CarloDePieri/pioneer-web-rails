import { Stack } from "@mui/material"
import { FlowNextActionButton } from "./components/FlowNextActionButton"
import { FlowRedoButton } from "./components/FlowRedoButton"
import { FlowUndoButton } from "./components/FlowUndoButton"

export function FlowButtons() {
  return (
    <Stack
      direction={"column"}
      alignItems={"flex-end"}
      justifyContent={"center"}
      spacing={16}
      mt={16}
      mr={16}
    >
      <FlowNextActionButton />
      <Stack direction={"column"} alignItems={"flex-end"} spacing={8}>
        <FlowUndoButton />
        <FlowRedoButton />
      </Stack>
    </Stack>
  )
}
