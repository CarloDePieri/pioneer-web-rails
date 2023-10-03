import { Draft } from "@reduxjs/toolkit"

export type GameFlowState = "NEW_ROUND" | "DEAL" | "PICK" | "END_GAME"

export interface GameFlow {
  future: GameFlowState[]
  past: GameFlowState[]
}

// Helper library to manipulate consistently the state GameFlow
export function gameFlowHelper(flow: Draft<GameFlow>) {
  return {
    advance(): void {
      let flowState = flow.future.pop()
      if (flowState) {
        flow.past.push(flowState)
      }
    },
    next(): GameFlowState {
      return flow.future[flow.future.length - 1]
    },
    undo(): void {
      let flowState = flow.past.pop()
      if (flowState) {
        flow.future.push(flowState)
      }
    },
  }
}

// The standard game flow, 4 rounds with 5 turns each
let round = ["NEW_ROUND"].concat(Array(5).fill(["DEAL", "PICK"]).flat())
let game = Array(4).fill(round).flat().concat(["ENG_GAME"])
export const standardGameFlow = game.toReversed()
