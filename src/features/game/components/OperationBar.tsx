import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  deal,
  newRound,
  selectDisplay,
  selectFutures,
  selectNextOp,
  selectRound,
} from "../gameSlice"
import { ActionCreators } from "redux-undo"

export function OperationBar() {
  const dispatch = useAppDispatch()
  const next = useAppSelector(selectNextOp)

  const display = useAppSelector(selectDisplay)
  const round = useAppSelector(selectRound)
  const future = useAppSelector(selectFutures)

  const isUndoDisabled = round === 1 && display.length === 0
  const isRedoDisabled = future.length === 0

  const doNextOp = () => {
    if (next === "DEAL") {
      dispatch(deal())
    } else if (next === "NEW_ROUND") {
      // Begin a new round
      dispatch(newRound())
      // Shuffle the first batch
      dispatch(deal())
    }
  }

  return (
    <div>
      <button onClick={doNextOp}>{next}</button>
      <button
        disabled={isUndoDisabled}
        onClick={() => dispatch(ActionCreators.undo())}
      >
        Undo
      </button>
      <button
        disabled={isRedoDisabled}
        onClick={() => dispatch(ActionCreators.redo())}
      >
        Redo
      </button>
    </div>
  )
}
