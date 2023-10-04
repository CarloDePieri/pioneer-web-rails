import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { GameFlowState } from "./gameFlows"
import {
  selectFutureStatesNumber,
  selectPastStatesNumber,
  deal,
  newRound,
  selectNextOp,
  selectCanUndo,
  selectCanRedo,
  selectAdvancedHandCardRule,
  dealSecrets,
  showSecrets,
} from "../gameSlice"
import { ActionCreators } from "redux-undo"

export function OperationBar() {
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
      default:
        break
    }
  }

  const nextButtonText = () => {
    let text = new Map<GameFlowState, string>([
      ["PICK", "Picking a card..."],
      ["DEAL", "Deal"],
      ["NEW_ROUND", "Shuffle and Deal"],
      ["SHOW_SECRETS", "Show secret cards"],
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
