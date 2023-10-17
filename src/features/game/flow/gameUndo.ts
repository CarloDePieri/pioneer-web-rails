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

  return {
    countUndo: undoN,
    countRedo: redoN,
    canRedo() {
      return redoN > 0 && state.gameState.present.gameFlow.status === "playing"
    },
    canUndo() {
      return undoN > 0
    },
  }
}
