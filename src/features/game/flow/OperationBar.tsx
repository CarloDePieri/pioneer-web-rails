import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { GameFlowState } from "./gameFlows"
import {
  selectFutureStatesNumber,
  selectPastStatesNumber,
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
  const futureStates = useAppSelector(selectFutureStatesNumber)
  const pastStates = useAppSelector(selectPastStatesNumber)

  const isUndoDisabled =
    (round === 1 && display.length === 0) || pastStates === 0
  const isRedoDisabled = futureStates === 0

  const nextButtonOp = () => {
    switch (next) {
      case "DEAL":
        dispatch(deal())
        break
      case "NEW_ROUND":
        // Begin a new round
        dispatch(newRound())
        // Shuffle the first batch
        dispatch(deal())
        break
      default:
        break
    }
  }

  const nextButtonText = () => {
    let text = new Map<GameFlowState, string>([
      ["PICK", "Picking a card..."],
      ["DEAL", "Deal"],
      ["NEW_ROUND", "Shuffle and Deal"],
      // TODO TOFIX this is not working
      ["END_GAME", "We are done!"],
    ]).get(next)
    return text ?? ""
  }

  return (
    <div>
      <button
        onClick={nextButtonOp}
        disabled={next === "PICK" || next === "END_GAME"}
      >
        {nextButtonText()}
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
