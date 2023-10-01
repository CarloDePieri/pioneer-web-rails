// OBJECTIVES
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { deckCards, GameState, jokers, GameConfig } from "./gameModel";

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
  config: {
    forestGoals: false,
    jokerExpansion: false,
    companyOwnerExpansion: false,
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

export const gameSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<GameConfig>) => {
      // Set the status and the game config
      state.status = "started"
      state.config = action.payload

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
      state.config = initialState.config
      state.deck = initialState.deck
      state.objectives = initialState.objectives
    },
    draw: (state) => {
      // Discard the current display if not empty
      let deck = state.deck;
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

// Actions
export const { init, reset, draw, newRound } = gameSlice.actions

// Reducer
export default gameSlice.reducer
