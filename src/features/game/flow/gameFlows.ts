import { Draft } from "@reduxjs/toolkit"

import { GameState } from "../gameSlice"
import { randomIndex } from "../helpers"

export type GameStatus = "pre" | "playing" | "end_game"
export type GameFlowState =
  | "NEW_ROUND"
  | "DEAL_SECRETS"
  | "DEAL"
  | "SHOW_SECRETS"
  | "PICK"
  | "END_GAME"

export interface GameFlow {
  status: GameStatus
  dealerId: number
  round: number
  turn: number
  future: GameFlowState[]
  past: GameFlowState[]
}

export const initialGameFlow: GameFlow = {
  status: "pre",
  round: 0,
  turn: 0,
  dealerId: -1,
  future: [],
  past: [],
}

// Helper library to manipulate consistently the game flow
export function gameFlow(state: Draft<GameState>) {
  let flow = state.gameFlow
  let players = state.players

  function goForward(): void {
    let flowState = flow.future.pop()
    if (flowState) {
      flow.past.push(flowState)
    }
  }
  function goBack(): void {
    let flowState = flow.past.pop()
    if (flowState) {
      flow.future.push(flowState)
    }
  }

  return {
    getDealerName(): string {
      return players[flow.dealerId]
    },
    getCurrentRound(): number {
      return flow.round
    },
    getCurrentTurn(): number {
      return flow.turn
    },
    getGameStatus(): GameStatus {
      return flow.status
    },
    getNextOp(): GameFlowState {
      return flow.future[flow.future.length - 1]
    },
    actions: {
      init(): void {
        // set the game as started
        flow.status = "playing"
        // set a random first dealer
        flow.dealerId = randomIndex(players)
        // set the game flow depending on the game mode
        if (!state.config.advancedHandCardRule) {
          flow.future = standardGameFlow
        } else {
          flow.future = advancedGameFlow
        }
      },
      newRound(): void {
        // reset the turn number
        flow.turn = 0
        // update the round number
        flow.round++
        // advance the game flow
        goForward()
      },
      deal(): void {
        // update the turn number
        flow.turn++
        // pick the next dealer
        flow.dealerId = (flow.dealerId + 1) % players.length
        // advance the game flow
        goForward()
      },
      dealSecrets() {
        goForward()
      },
      showSecrets() {
        // update the turn number
        flow.turn++
        goForward()
      },
      pick(): void {
        goForward()
      },
      unpick(): void {
        goBack()
      },
    },
  }
}

// The standard game flow, 4 rounds with 5 turns each
let round = Array<GameFlowState>("NEW_ROUND").concat(
  Array(5).fill(Array<GameFlowState>("DEAL", "PICK")).flat(),
)
let game: GameFlowState[] = Array(4)
  .fill(round)
  .flat()
  .concat(Array<GameFlowState>("END_GAME"))
export const standardGameFlow = game.toReversed()

// Advanced hand game flow: at the start of the round deal the secret final round card
let aRound = Array<GameFlowState>("NEW_ROUND", "DEAL_SECRETS").concat(
  Array(4)
    .fill(Array<GameFlowState>("DEAL", "PICK"))
    .flat()
    .concat(Array<GameFlowState>("SHOW_SECRETS")),
)
let aGame: GameFlowState[] = Array(4)
  .fill(aRound)
  .flat()
  .concat(Array<GameFlowState>("END_GAME"))
export const advancedGameFlow = aGame.toReversed()
