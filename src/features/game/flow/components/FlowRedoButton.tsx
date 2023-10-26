import RedoIcon from "@mui/icons-material/Redo"
import { Badge, Fab } from "@mui/material"
import { ActionCreators } from "redux-undo"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { selectCanRedo, selectFutureStatesNumber } from "../../gameSlice"

export function FlowRedoButton() {
  const dispatch = useAppDispatch()
  const futureStates = useAppSelector(selectFutureStatesNumber)
  const isRedoDisabled = !useAppSelector(selectCanRedo)

  return (
    <Fab
      disabled={isRedoDisabled}
      onClick={() => dispatch(ActionCreators.redo())}
    >
      <Badge badgeContent={futureStates} color="primary">
        <RedoIcon sx={{ mr: 1 }} />
      </Badge>
    </Fab>
  )
}
