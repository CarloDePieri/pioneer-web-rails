// GOALS
import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { GameState, Goal, NewGame } from "./gameModel"
import { cardsDeck, goalDeck, jokers } from "./gameDecks"

function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

function randomIndex<T>(array: T[]): number {
  return Math.floor(Math.random() * array.length)
}

function pickRandom<T>(array: T[]): T {
  return array[randomIndex(array)]
}

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
}

const getNextOp = (state: Draft<GameState> | GameState) => {
  if (state.status === "pre") {
    return "INIT"
  } else if (state.status === "started") {
    if (
      state.deck.selectedCard === undefined &&
      state.deck.display.length > 0
    ) {
      return "PICK"
    } else if (state.turn < 5) {
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

const pickGoals = (state: Draft<GameState>): Goal[] => {
  let sheriffGoal
  let ranchGoal
  let trainGoal
  if (state.config.forestMap) {
    sheriffGoal = pickRandom(
      goalDeck.desert.sheriff
        .filter((goal) => !["1A", "1B", "1C", "1E"].includes(goal.id))
        .concat(goalDeck.forest.sheriff),
    )
    ranchGoal = pickRandom(goalDeck.desert.ranch.concat(goalDeck.forest.ranch))
    trainGoal = pickRandom(goalDeck.desert.train.concat(goalDeck.forest.train))
  } else {
    sheriffGoal = pickRandom(goalDeck.desert.sheriff)
    ranchGoal = pickRandom(goalDeck.desert.ranch)
    trainGoal = pickRandom(goalDeck.desert.train)
  }
  return [sheriffGoal, ranchGoal, trainGoal]
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
      const [sheriffGoal, ranchGoal, trainGoal] = pickGoals(state)
      state.goals.sheriff = sheriffGoal
      state.goals.ranch = ranchGoal
      state.goals.train = trainGoal

      // Populate and shuffle the deck
      if (state.config.jokerExpansion) {
        // Using Joker Cards mini expansion
        state.deck.deck = shuffle(cardsDeck.concat(jokers))
      } else {
        state.deck.deck = shuffle(cardsDeck)
      }

      // Set the round
      state.round = 1
    },
    reset: (state) => {
      state.status = initialState.status
      state.round = 0
      state.turn = 0
      state.dealerId = -1
      state.config = initialState.config
      state.deck = initialState.deck
      state.goals = initialState.goals
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

      // update the dealer
      state.dealerId = (state.dealerId + 1) % state.players.length
      // update the turn
      state.turn++
      // TODO check if two joker have been drawn
    },
    newRound: (state) => {
      // Populate and shuffle the deck
      if (state.config.jokerExpansion) {
        // Using Joker Cards mini expansion
        state.deck.deck = shuffle(cardsDeck.concat(jokers))
      } else {
        state.deck.deck = shuffle(cardsDeck)
      }
      state.deck.display = []
      state.deck.discard = []
      state.deck.selectedCard = undefined
      state.round++
      state.turn = 0
    },
    pick: (state, action: PayloadAction<string>) => {
      let pickedCardId = action.payload
      state.deck.selectedCard = state.deck.display.filter(
        (card) => card.id === pickedCardId,
      )[0]
    },
    unpick: (state) => {
      state.deck.selectedCard = undefined
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
export const selectGoals = (state: RootState) => state.gameState.present.goals
export const selectPlayers = (state: RootState) =>
  state.gameState.present.players
export const selectRound = (state: RootState) => state.gameState.present.round
export const selectTurn = (state: RootState) => state.gameState.present.turn
export const selectDealer = (state: RootState) =>
  state.gameState.present.players[state.gameState.present.dealerId]
export const selectNextOp = (state: RootState) =>
  getNextOp(state.gameState.present)
export const countFutureStates = (state: RootState) =>
  state.gameState.future.length
export const countPastStates = (state: RootState) => state.gameState.past.length
export const selectPickedCard = (state: RootState) =>
  state.gameState.present.deck.selectedCard

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
