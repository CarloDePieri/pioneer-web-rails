import { Badge, Fab, Stack } from "@mui/material"

// pick
import UndoIcon from "@mui/icons-material/Undo"
import RedoIcon from "@mui/icons-material/Redo"
import { ActionCreators } from "redux-undo"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { openGoalsGallery } from "../../gallery/gallerySlice"
import {
  deal,
  dealSecrets,
  newRound,
  selectAdvancedHandCardRule,
  selectCanRedo,
  selectCanUndo,
  selectFutureStatesNumber,
  selectNextOp,
  selectPastStatesNumber,
  showSecrets,
} from "../gameSlice"
import { GameFlowState } from "./gameFlows"

export function FlowButtons() {
  const dispatch = useAppDispatch()
  const next = useAppSelector(selectNextOp)
  const advanced = useAppSelector(selectAdvancedHandCardRule)

  const futureStates = useAppSelector(selectFutureStatesNumber)
  const pastStates = useAppSelector(selectPastStatesNumber)

  const isUndoDisabled = !useAppSelector(selectCanUndo)
  const isRedoDisabled = !useAppSelector(selectCanRedo)

  const nextButtonOp = () => {
    switch (next) {
      case "DEAL":
        dispatch(deal())
        break
      case "NEW_ROUND":
        // Begin a new round
        dispatch(newRound())
        if (!advanced) {
          // Deal the first three cards
          dispatch(deal())
        } else {
          // Deal the secret cards
          dispatch(dealSecrets())
        }
        break
      case "SHOW_SECRETS":
        dispatch(showSecrets())
        break
      case "END_GAME":
        dispatch(openGoalsGallery())
        break
      default:
        break
    }
  }

  const nextButtonText = () => {
    let text = new Map<GameFlowState, string>([
      ["PICK", "Pick"],
      ["DEAL", "Deal"],
      ["NEW_ROUND", "Shuffle"],
      ["SHOW_SECRETS", "Secrets"],
      ["END_GAME", "Done"],
    ]).get(next)
    return text ?? ""
  }

  return (
    <Stack
      direction={"column"}
      alignItems={"flex-end"}
      justifyContent={"center"}
      spacing={16}
      mt={16}
      mr={16}
    >
      <Fab
        color={"success"}
        variant="extended"
        sx={{ width: "10vw", height: "10vw" }}
        onClick={nextButtonOp}
        disabled={next === "PICK"}
      >
        {nextButtonText()}
      </Fab>
      <Stack direction={"column"} alignItems={"flex-end"} spacing={8}>
        <Fab
          disabled={isUndoDisabled}
          onClick={() => dispatch(ActionCreators.undo())}
        >
          <Badge badgeContent={pastStates} color="primary">
            <UndoIcon sx={{ mr: 1 }} />
          </Badge>
        </Fab>
        <Fab
          disabled={isRedoDisabled}
          onClick={() => dispatch(ActionCreators.redo())}
        >
          <Badge badgeContent={futureStates} color="primary">
            <RedoIcon sx={{ mr: 1 }} />
          </Badge>
        </Fab>
      </Stack>
    </Stack>
  )
}
