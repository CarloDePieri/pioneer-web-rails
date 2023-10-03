import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { company } from "./company/gameCompany"
import { GameState, NewGame } from "./gameModel"
import { cardsDeck, jokers } from "./gameDecks"
import { gameFlow } from "./flow/gameFlows"
import { pickRandom, shuffle } from "./helpers"
import { goals } from "./goals/gameGoals"

// Initial game state
const initialState: GameState = {
  players: [],
  config: {
    forestMap: false,
    jokerExpansion: false,
    companyOwnersExpansion: false,
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
  companyOwners: {
    companyCard: undefined,
    companyDeck: [],
  },
  gameFlow: {
    status: "pre",
    round: 0,
    turn: 0,
    dealerId: -1,
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
      state.config = action.payload.config
      state.players = action.payload.players

      // set up the game flow
      gameFlow(state).actions.init()

      // Pick the correct goals
      goals(state).init()

      // Populate the deck
      if (state.config.jokerExpansion) {
        // Using Joker Cards mini expansion
        state.deck.deck = cardsDeck.concat(jokers)
      } else {
        state.deck.deck = cardsDeck
      }

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

      // advance the game flow with a deal action
      gameFlow(state).actions.deal()
    },
    newRound: (state) => {
      // Shuffle the display and the discard pile with the deck
      state.deck.deck = shuffle(
        state.deck.deck.concat(state.deck.display).concat(state.deck.discard),
      )
      state.deck.display = []
      state.deck.discard = []
      state.deck.selectedCard = undefined

      // Draw a company owner card if using the expansion
      if (state.config.companyOwnersExpansion) {
        company(state).draw()
      }

      // advance the game flow with a newRound action
      gameFlow(state).actions.newRound()
    },
    pick: (state, action: PayloadAction<string>) => {
      let pickedCardId = action.payload
      state.deck.selectedCard = state.deck.display.filter(
        (card) => card.id === pickedCardId,
      )[0]

      // advance the game flow
      gameFlow(state).actions.pick()
    },
    unpick: (state) => {
      state.deck.selectedCard = undefined

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

export const selectDeck = (state: RootState) =>
  state.gameState.present.deck.deck // TODO this could probably be removed
export const selectDisplay = (state: RootState) =>
  state.gameState.present.deck.display
export const selectDiscard = (state: RootState) =>
  state.gameState.present.deck.discard
export const selectPickedCard = (state: RootState) =>
  state.gameState.present.deck.selectedCard

// shorthand to interact with the present state
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
