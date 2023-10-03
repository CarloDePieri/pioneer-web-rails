import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  countFutureStates,
  countPastStates,
  deal,
  newRound,
  selectDisplay,
  selectNextOp,
  selectRound,
} from "../gameSlice"
import { ActionCreators } from "redux-undo"

export function OperationBar() {
  const dispatch = useAppDispatch()
  const next = useAppSelector(selectNextOp)

  const display = useAppSelector(selectDisplay)
  const round = useAppSelector(selectRound)
  const futureStates = useAppSelector(countFutureStates)
  const pastStates = useAppSelector(countPastStates)

  const isUndoDisabled =
    (round === 1 && display.length === 0) || pastStates === 0
  const isRedoDisabled = futureStates === 0

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

  const opButtonText = () => {
    switch (next) {
      case "PICK":
        return "Picking a card..."
      case "DEAL":
        return "Deal"
      case "NEW_ROUND":
        return "Shuffle and Deal"
      case "END_GAME":
        return "We are done!"
    }
  }

  return (
    <div>
      <button
        onClick={doNextOp}
        disabled={next === "PICK" || next === "END_GAME"}
      >
        {opButtonText()}
      </button>
      <button
        disabled={isUndoDisabled}
        onClick={() => dispatch(ActionCreators.undo())}
      >
        Undo {pastStates > 0 ? "(" + pastStates + ")" : ""}
      </button>
      <button
        disabled={isRedoDisabled}
        onClick={() => dispatch(ActionCreators.redo())}
      >
        Redo {futureStates > 0 ? "(" + futureStates + ")" : ""}
      </button>
    </div>
  )
}
