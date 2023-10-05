import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { RootState } from "../../app/store"

import {
  company,
  CompanyOwners,
  companySelector,
  initialCompanyOwners,
} from "./company/gameCompany"
import { deck, deckSelector, initialTable, Table } from "./deck/gameDeck"
import {
  GameFlow,
  gameFlow,
  gameFlowSelector,
  initialGameFlow,
} from "./flow/gameFlows"
import { undoHelper, undoHelperSelector } from "./flow/gameUndo";
import { Goals, goals, goalsSelector, initialGoals } from "./goals/gameGoals";
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
      gameFlow(state).init()

      // Pick the correct goals
      goals(state).init()

      // Populate the deck
      deck(state).init()

      // Prepare the company owners deck, if using the expansion
      if (state.config.companyOwnersExpansion) {
        company(state).init()
      }
    },
    newGame: (state) => {
      // reset everything but the players
      let players = state.players
      return { ...initialState, players }
    },
    deal: (state) => {
      // deal the card in the display
      deck(state).deal()

      // advance the game flow with a deal action
      gameFlow(state).deal()
    },
    dealSecrets: (state) => {
      // deal the secret cards
      deck(state).dealSecrets()
      // advance the game flow with a dealSecrets action
      gameFlow(state).dealSecrets()
    },
    showSecrets: (state) => {
      deck(state).showSecrets()
      // advance the game flow with a showSecrets action
      gameFlow(state).showSecrets()
    },
    newRound: (state) => {
      // set up the deck
      deck(state).newRound()

      // draw a company owner card if using the expansion
      if (state.config.companyOwnersExpansion) {
        company(state).draw()
      }

      // advance the game flow with a newRound action
      gameFlow(state).newRound()
    },
    pick: (state, action: PayloadAction<string>) => {
      if (state.table.selectedCard === undefined) {
        // advance the game flow only if there was no card selected
        gameFlow(state).pick()
      }

      // pick the card
      deck(state).pick(action.payload)
    },
    unpick: (state) => {
      // unpick the card
      deck(state).unpick()

      // reset the game flow
      gameFlow(state).unpick()
    },
  },
})

// Selectors
export const selectPlayers = (state: RootState) =>
  state.gameState.present.players
export const selectAdvancedHandCardRule = (state: RootState) =>
  state.gameState.present.config.advancedHandCardRule

export const selectFutureStatesNumber = undoHelperSelector.countRedo
export const selectPastStatesNumber = undoHelperSelector.countUndo
export const selectCanUndo = undoHelperSelector.canUndo
export const selectCanRedo = undoHelperSelector.canRedo

// deck
export const selectDeck = deckSelector.deck
export const selectDisplay = deckSelector.display
export const selectDiscard = deckSelector.discard
export const selectPickedCard = deckSelector.selectedCard
export const selectSecretCards = deckSelector.secretCards

// shorthand to interact with the present state of the game flow
export const selectDealer = gameFlowSelector.dealerName
export const selectRound = gameFlowSelector.currentRound
export const selectTurn = gameFlowSelector.currentTurn
export const selectGameStatus = gameFlowSelector.gameStatus
export const selectNextOp = gameFlowSelector.nextOp

export const selectGoals = goalsSelector.activeGoals

export const selectCompanyCard = companySelector.roundCard

// Actions
// eslint-disable-next-line
export const {
  init,
  newGame,
  deal,
  dealSecrets,
  showSecrets,
  newRound,
  pick,
  unpick,
} = gameSlice.actions

// Reducer
export default gameSlice.reducer
