import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../../app/store"

import {
  company,
  CompanyOwners,
  initialCompanyOwners,
} from "./company/gameCompany"
import { deck, initialTable, Table } from "./deck/gameDeck"
import { GameFlow, gameFlow, initialGameFlow } from "./flow/gameFlows"
import { Goals, goals, initialGoals } from "./goals/gameGoals"
import { GameConfig, initialGameConfig, NewGame } from "./newGame/gameStart";

export interface GameState {
  players: string[]
  config: GameConfig
  goals: Goals
  table: Table
  companyOwners: CompanyOwners
  gameFlow: GameFlow
}

// Initial game state
const initialState: GameState = {
  players: [],
  config: initialGameConfig,
  gameFlow: initialGameFlow,
  table: initialTable,
  goals: initialGoals,
  companyOwners: initialCompanyOwners,
}

export const gameSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<NewGame>) => {
      // Set the status, the game config and the player order
      state.config = action.payload.config
      state.players = action.payload.players

      // set up the game flow
      gameFlow(state).actions.init()

      // Pick the correct goals
      goals(state).init()

      // Populate the deck
      deck(state).actions.init()

      // Prepare the company owners deck, if using the expansion
      if (state.config.companyOwnersExpansion) {
        company(state).init()
      }
    },
    reset: (state) => {
      // reset everything but the players
      let players = state.players
      return { ...initialState, players }
    },
    deal: (state) => {
      // deal the card in the display
      deck(state).actions.deal()

      // advance the game flow with a deal action
      gameFlow(state).actions.deal()
    },
    newRound: (state) => {
      // set up the deck
      deck(state).actions.newRound()

      // draw a company owner card if using the expansion
      if (state.config.companyOwnersExpansion) {
        company(state).draw()
      }

      // advance the game flow with a newRound action
      gameFlow(state).actions.newRound()
    },
    pick: (state, action: PayloadAction<string>) => {
      // pick the card
      deck(state).actions.pick(action.payload)

      // advance the game flow
      gameFlow(state).actions.pick()
    },
    unpick: (state) => {
      // unpick the card
      deck(state).actions.unpick()

      // reset the game flow
      gameFlow(state).actions.unpick()
    },
  },
})

// Selectors
export const selectPlayers = (state: RootState) =>
  state.gameState.present.players
export const selectFutureStatesNumber = (state: RootState) =>
  state.gameState.future.length
export const selectPastStatesNumber = (state: RootState) =>
  state.gameState.past.length

// shorthand to interact with the present state of the deck
let deckP = (state: RootState) => {
  return deck(state.gameState.present)
}
export const selectDeck = (state: RootState) => deckP(state).getDeck()
export const selectDisplay = (state: RootState) => deckP(state).getDisplay()
export const selectDiscard = (state: RootState) => deckP(state).getDiscard()
export const selectPickedCard = (state: RootState) =>
  deckP(state).getSelectedCard()

// shorthand to interact with the present state of the gameflow
let gameFlowP = (state: RootState) => {
  return gameFlow(state.gameState.present)
}
export const selectDealer = (state: RootState) =>
  gameFlowP(state).getDealerName()
export const selectRound = (state: RootState) =>
  gameFlowP(state).getCurrentRound()
export const selectTurn = (state: RootState) =>
  gameFlowP(state).getCurrentTurn()
export const selectGameStatus = (state: RootState) =>
  gameFlowP(state).getGameStatus()
export const selectNextOp = (state: RootState) => gameFlowP(state).getNextOp()

export const selectGoals = (state: RootState) =>
  goals(state.gameState.present).getActive()

export const selectCompanyCard = (state: RootState) =>
  company(state.gameState.present).getCompanyCard()

// Actions
// eslint-disable-next-line
export const {
  init,
  reset,
  deal,
  newRound,
  pick,
  unpick
} = gameSlice.actions

// Reducer
export default gameSlice.reducer
