import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    lang: "en-US",
    hideLayoutWarning: false,
    modalIsOpen: false,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload
    },
    disableHideLayoutWarning: (state) => {
      state.hideLayoutWarning = true
    },
    openSettings: (state) => {
      state.modalIsOpen = true
    },
    closeSettings: (state) => {
      state.modalIsOpen = false
    },
  },
})

export const selectSettingsModalIsOpen = (state: RootState) =>
  state.settings.modalIsOpen
export const selectLanguage = (state: RootState) => state.settings.lang
export const selectHideLayoutWarning = (state: RootState) =>
  state.settings.hideLayoutWarning

export const {
  setLanguage,
  disableHideLayoutWarning,
  openSettings,
  closeSettings,
} = settingsSlice.actions

export default settingsSlice.reducer
