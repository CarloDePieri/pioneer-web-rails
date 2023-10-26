import UndoIcon from "@mui/icons-material/Undo"
import { Badge, Fab } from "@mui/material"
import { ActionCreators } from "redux-undo"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { selectCanUndo, selectPastStatesNumber } from "../../gameSlice"

export function FlowUndoButton() {
  const dispatch = useAppDispatch()
  const isUndoDisabled = !useAppSelector(selectCanUndo)
  const pastStates = useAppSelector(selectPastStatesNumber)

  return (
    <Fab
      disabled={isUndoDisabled}
      onClick={() => dispatch(ActionCreators.undo())}
    >
      <Badge badgeContent={pastStates} color="primary">
        <UndoIcon sx={{ mr: 1 }} />
      </Badge>
    </Fab>
  )
}
