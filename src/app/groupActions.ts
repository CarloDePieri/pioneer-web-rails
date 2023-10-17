import { AnyAction } from "@reduxjs/toolkit"
import { GameFlowState } from "../features/game/flow/gameFlows"
import { GameState } from "../features/game/gameSlice"

function checkGameFlowState(
  states: GameFlowState[],
  offset: number,
  name: string,
): boolean {
  return states[states.length - offset] === name
}

export const isInNewRoundGroup = (
  action: AnyAction,
  currentState: GameState,
): boolean => {
  const past = currentState.gameFlow.past
  const future = currentState.gameFlow.future
  if (currentState.config.advancedHandCardRule) {
    if (action.type === "gameState/dealSecrets") {
      return checkGameFlowState(past, 2, "NEW_ROUND")
    } else if (action.type === "gameState/newRound") {
      return checkGameFlowState(future, 1, "DEAL_SECRETS")
    }
  } else if (action.type === "gameState/deal") {
    // offset that takes into account the difference with the 5 player mode deal action
    const newRoundOffset = currentState.players.length >= 5 ? 3 : 2
    return checkGameFlowState(past, newRoundOffset, "NEW_ROUND")
  } else if (action.type === "gameState/newRound") {
    return checkGameFlowState(future, 1, "DEAL")
  }
  return false
}
