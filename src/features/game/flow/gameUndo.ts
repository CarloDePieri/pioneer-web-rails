import { RootState } from "../../../app/store"

export const undoHelperSelector = {
  countRedo: (state: RootState) => undoHelper(state).countRedo,
  countUndo: (state: RootState) => undoHelper(state).countUndo,
  canUndo: (state: RootState) => undoHelper(state).canUndo(),
  canRedo: (state: RootState) => undoHelper(state).canRedo(),
}

export function undoHelper(state: RootState) {
  let undoN = state.gameState.past.length
  let redoN = state.gameState.future.length

  let gameFlowPast = state.gameState.present.gameFlow.past
  let theLastActionWasTheFirstCardDeal =
    // there was only a deal action...
    gameFlowPast.filter((state) => state === "DEAL").length === 1 &&
    // and it's the last action performed
    gameFlowPast[gameFlowPast.length - 1] === "DEAL"

  return {
    countUndo: undoN,
    countRedo: redoN,
    canRedo() {
      return redoN > 0 && state.gameState.present.gameFlow.status === "playing"
    },
    canUndo() {
      return !theLastActionWasTheFirstCardDeal && undoN > 0
    },
  }
}
