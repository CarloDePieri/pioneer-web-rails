import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../../app/store"

import {
  company,
  CompanyOwners,
  initialCompanyOwners,
} from "./company/gameCompany"
import { deck, deckSelector, initialTable, Table } from "./deck/gameDeck"
import { GameFlow, gameFlow, initialGameFlow } from "./flow/gameFlows"
import { undoHelper } from "./flow/gameUndo"
import { Goals, goals, initialGoals } from "./goals/gameGoals"
import { GameConfig, initialGameConfig, NewGame } from "./newGame/gameStart"

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
      deck(state).init()

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
      deck(state).deal()

      // advance the game flow with a deal action
      gameFlow(state).actions.deal()
    },
    dealSecrets: (state) => {
      // deal the secret cards
      deck(state).dealSecrets()
      // advance the game flow with a dealSecrets action
      gameFlow(state).actions.dealSecrets()
    },
    showSecrets: (state) => {
      deck(state).showSecrets()
      // advance the game flow with a showSecrets action
      gameFlow(state).actions.showSecrets()
    },
    newRound: (state) => {
      // set up the deck
      deck(state).newRound()

      // draw a company owner card if using the expansion
      if (state.config.companyOwnersExpansion) {
        company(state).draw()
      }

      // advance the game flow with a newRound action
      gameFlow(state).actions.newRound()
    },
    pick: (state, action: PayloadAction<string>) => {
      // pick the card
      deck(state).pick(action.payload)

      // advance the game flow
      gameFlow(state).actions.pick()
    },
    unpick: (state) => {
      // unpick the card
      deck(state).unpick()

      // reset the game flow
      gameFlow(state).actions.unpick()
    },
  },
})

// Selectors
export const selectPlayers = (state: RootState) =>
  state.gameState.present.players
export const selectAdvancedHandCardRule = (state: RootState) =>
  state.gameState.present.config.advancedHandCardRule

export const selectFutureStatesNumber = (state: RootState) =>
  undoHelper(state).countRedo
export const selectPastStatesNumber = (state: RootState) =>
  undoHelper(state).countUndo
export const selectCanUndo = (state: RootState) => undoHelper(state).canUndo()
export const selectCanRedo = (state: RootState) => undoHelper(state).canRedo()

// deck
export const selectDeck = deckSelector.deck
export const selectDisplay = deckSelector.display
export const selectDiscard = deckSelector.discard
export const selectPickedCard = deckSelector.selectedCard
export const selectSecretCards = deckSelector.secretCards

// shorthand to interact with the present state of the game flow
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
  dealSecrets,
  showSecrets,
  newRound,
  pick,
  unpick,
} = gameSlice.actions

// Reducer
export default gameSlice.reducer
