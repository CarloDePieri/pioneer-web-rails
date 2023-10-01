// OBJECTIVES
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { deckCards, GameState, jokers, NewGame } from "./gameModel"

function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

// Initial game state
const initialState: GameState = {
  status: "pre",
  round: 0,
  players: [],
  dealerId: -1,
  config: {
    forestMap: false,
    jokerExpansion: false,
    companyOwnerExpansion: false,
    advancedHandCardRule: false,
  },
  objectives: {
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
}

const getNextOp = (state: Draft<GameState> | GameState) => {
  if (state.status === "pre") {
    return "INIT"
  } else if (state.status === "started") {
    if (state.deck.deck.length > 0) {
      return "DEAL"
    } else if (state.round < 4) {
      return "NEW_ROUND"
    } else {
      return "DONE"
    }
  } else {
    return "RESET"
  }
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
      state.dealerId = Math.floor(Math.random() * state.players.length)

      // choose: use one of the forest one? force at least one of them?
      // TODO pick the objectives at random here
      state.objectives.sheriff = {
        id: "1A",
        img: "1a.png",
      }
      state.objectives.ranch = {
        id: "1G",
        img: "1g.png",
      }
      state.objectives.train = {
        id: "1L",
        img: "1l.png",
      }

      // Populate and shuffle the deck
      if (state.config.jokerExpansion) {
        // Using Joker Cards mini expansion
        state.deck.deck = shuffle(deckCards.concat(jokers))
      } else {
        state.deck.deck = shuffle(deckCards)
      }

      // Set the round
      state.round = 1
    },
    reset: (state) => {
      state.status = initialState.status
      state.round = 0
      state.dealerId = -1
      state.config = initialState.config
      state.deck = initialState.deck
      state.objectives = initialState.objectives
      // note: we keep the players
    },
    deal: (state) => {
      // Discard the current display if not empty
      let deck = state.deck
      if (deck.display.length > 0) {
        deck.discard = deck.discard.concat(deck.display)
        deck.display = []
      }
      // Draw three cards
      while (deck.display.length < 3 && deck.deck.length > 0) {
        let card = deck.deck.pop()
        if (card) {
          deck.display = deck.display.concat(card)
        }
      }

      // update the turn player
      state.dealerId = (state.dealerId + 1) % state.players.length
      // TODO check if two joker have been drawn
    },
    newRound: (state) => {
      // Populate and shuffle the deck
      if (state.config.jokerExpansion) {
        // Using Joker Cards mini expansion
        state.deck.deck = shuffle(deckCards.concat(jokers))
      } else {
        state.deck.deck = shuffle(deckCards)
      }
      state.deck.display = []
      state.deck.discard = []
      state.deck.selectedCard = undefined
      state.round++
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
export const selectObjectives = (state: RootState) =>
  state.gameState.present.objectives
export const selectPlayers = (state: RootState) =>
  state.gameState.present.players
export const selectRound = (state: RootState) => state.gameState.present.round
export const selectDealer = (state: RootState) =>
  state.gameState.present.players[state.gameState.present.dealerId]
export const selectNextOp = (state: RootState) =>
  getNextOp(state.gameState.present)
export const selectFutures = (state: RootState) => state.gameState.future

// Actions
// eslint-disable-next-line
export const {
  init,
  reset,
  deal,
  newRound,
} = gameSlice.actions

// Reducer
export default gameSlice.reducer
