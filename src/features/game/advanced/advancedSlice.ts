import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import { images } from "../../../res/images"
import { selectedDeckTheme } from "../../settings/deckThemes"
import { GameCard, deckSelector } from "../deck/gameDeck"

interface AdvancedGalleryState {
  open: boolean
  selectedPlayerId: string | undefined
  isCardShown: boolean
}

const initialState: AdvancedGalleryState = {
  open: false,
  selectedPlayerId: undefined,
  isCardShown: false,
}

export const advancedSlice = createSlice({
  name: "advanced",
  initialState,
  reducers: {
    openAdvancedGallery: (state) => {
      state.open = true
    },
    closeAdvancedGallery: (state) => {
      return initialState
    },
    pickAdvancedGalleryPlayer: (state, action: PayloadAction<string>) => {
      state.selectedPlayerId = action.payload
    },
    resetAdvancedGalleryPlayer: (state) => {
      state.selectedPlayerId = undefined
    },
    toggleCard: (state) => {
      state.isCardShown = !state.isCardShown
    },
  },
})

export const selectAdvancedGalleryOpen = (state: RootState) =>
  state.interface.advancedGallery.open

export const selectAdvancedGalleryPlayerId = (state: RootState) =>
  state.interface.advancedGallery.selectedPlayerId

export const selectAdvancedGalleryIsCardShown = (state: RootState) =>
  state.interface.advancedGallery.isCardShown

export const selectSecretCardUrl = createSelector(
  [
    deckSelector.secretCards,
    (state: RootState) => state.interface.advancedGallery.selectedPlayerId,
    (state: RootState) => state.interface.advancedGallery.isCardShown,
  ],
  (
    secrets: Map<string, GameCard | undefined>,
    playerId: string | undefined,
    isCardShown: boolean,
  ) => {
    const back = selectedDeckTheme.back
    if (isCardShown && playerId) {
      const card = secrets.get(playerId)
      return card?.img ?? back
    } else {
      return back
    }
  },
)

export const {
  openAdvancedGallery,
  closeAdvancedGallery,
  pickAdvancedGalleryPlayer,
  resetAdvancedGalleryPlayer,
  toggleCard,
} = advancedSlice.actions

export default advancedSlice.reducer
