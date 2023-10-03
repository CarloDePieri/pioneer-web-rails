// GOALS
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { GameState, NewGame } from "./gameModel"
import { cardsDeck, companyDeck, jokers } from "./gameDecks"
import { gameFlowHelper, standardGameFlow } from "./gameFlows"
import { pickRandom, randomIndex, shuffle } from "./helpers"
import { goals } from "./goals/gameGoals"

// Initial game state
const initialState: GameState = {
  status: "pre",
  round: 0,
  turn: 0,
  players: [],
  dealerId: -1,
  config: {
    forestMap: false,
    jokerExpansion: false,
    companyOwnerExpansion: false,
    advancedHandCardRule: false,
  },
  goals: {
    sheriff: undefined,
    train: undefined,
    ranch: undefined,
  },
  deck: {
    deck: [],
    display: [],
    selectedCard: undefined,
    discard: [],
  },
  companyCard: undefined,
  companyDeck: [],
  gameFlow: {
    future: [],
    past: [],
  },
}

export const gameSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<NewGame>) => {
      // Set the status, the game config and the player order
      state.status = "started"
      state.config = action.payload.config
      state.players = action.payload.players
      state.dealerId = randomIndex(state.players)

      // Pick the correct goals
      goals(state).pick()

      // Populate the deck
      if (state.config.jokerExpansion) {
        // Using Joker Cards mini expansion
        state.deck.deck = cardsDeck.concat(jokers)
      } else {
        state.deck.deck = cardsDeck
      }

      // Prepare the company owners deck, if needed
      if (state.config.companyOwnerExpansion) {
        let cDeck
        if (!state.config.forestMap) {
          cDeck = companyDeck.filter((card) => card.id !== "C1")
        } else {
          cDeck = companyDeck
        }
        state.companyDeck = shuffle(cDeck).slice(0, 4)
      }

      // Set up the game flow
      state.gameFlow.future = standardGameFlow
    },
    reset: (state) => {
      state.status = initialState.status
      state.round = 0
      state.turn = 0
      state.dealerId = -1
      state.config = initialState.config
      state.deck = initialState.deck
      state.goals = initialState.goals
      state.gameFlow = initialState.gameFlow
      // note: we keep the players
    },
    deal: (state) => {
      // Discard the current display if not empty
      let deck = state.deck
      if (deck.display.length > 0) {
        deck.discard = deck.discard.concat(deck.display)
        deck.display = []
      }
      // Reset the selected card
      deck.selectedCard = undefined
      // Draw three cards
      while (deck.display.length < 3 && deck.deck.length > 0) {
        let card = deck.deck.pop()
        if (card) {
          deck.display = deck.display.concat(card)
        }
      }
      // Check if two joker have been drawn at the same time
      if (state.config.jokerExpansion) {
        if (
          state.deck.display.filter(
            (card) => card.id === jokers[0].id || card.id === jokers[1].id,
          ).length === 2
        ) {
          // discard a joker from the display
          let joker = pickRandom(jokers)
          state.deck.display = state.deck.display.filter(
            (card) => card.id !== joker.id,
          )
          state.deck.discard.push(joker)
          // draw another card from the deck
          let card = deck.deck.pop()
          if (card) {
            state.deck.display.push(card)
          }
        }
      }

      // update the dealer
      state.dealerId = (state.dealerId + 1) % state.players.length
      // update the turn
      state.turn++
      // advance the game flow
      gameFlowHelper(state.gameFlow).advance()
    },
    newRound: (state) => {
      // Shuffle the display and the discard pile with the deck
      state.deck.deck = shuffle(
        state.deck.deck.concat(state.deck.display).concat(state.deck.discard),
      )
      state.deck.display = []
      state.deck.discard = []
      state.deck.selectedCard = undefined

      // Set up round and turn numbers
      state.round++
      state.turn = 0

      // Draw a company owner card if needed
      if (state.config.companyOwnerExpansion) {
        let card = state.companyDeck.pop()
        if (card) {
          state.companyCard = card
        }
      }

      // advance the game flow
      gameFlowHelper(state.gameFlow).advance()
    },
    pick: (state, action: PayloadAction<string>) => {
      let pickedCardId = action.payload
      state.deck.selectedCard = state.deck.display.filter(
        (card) => card.id === pickedCardId,
      )[0]

      // advance the game flow
      gameFlowHelper(state.gameFlow).advance()
    },
    unpick: (state) => {
      state.deck.selectedCard = undefined

      // reset the game flow
      gameFlowHelper(state.gameFlow).undo()
    },
  },
})

// Selectors
export const selectStatus = (state: RootState) => state.gameState.present.status
export const selectDeck = (state: RootState) =>
  state.gameState.present.deck.deck // TODO this could probably be removed
export const selectDisplay = (state: RootState) =>
  state.gameState.present.deck.display
export const selectDiscard = (state: RootState) =>
  state.gameState.present.deck.discard
export const selectPlayers = (state: RootState) =>
  state.gameState.present.players
export const selectRound = (state: RootState) => state.gameState.present.round
export const selectTurn = (state: RootState) => state.gameState.present.turn
export const selectDealer = (state: RootState) =>
  state.gameState.present.players[state.gameState.present.dealerId]
export const countFutureStates = (state: RootState) =>
  state.gameState.future.length
export const countPastStates = (state: RootState) => state.gameState.past.length
export const selectPickedCard = (state: RootState) =>
  state.gameState.present.deck.selectedCard
export const selectCompanyCard = (state: RootState) =>
  state.gameState.present.companyCard

export const selectNextOp = (state: RootState) =>
  gameFlowHelper(state.gameState.present.gameFlow).next()
export const selectGoals = (state: RootState) =>
  goals(state.gameState.present).getActive()

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
