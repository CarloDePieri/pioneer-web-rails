import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    lang: "en-US",
    hideLayoutWarning: false,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload
    },
    disableHideLayoutWarning: (state) => {
      state.hideLayoutWarning = true
    },
  },
})

export const selectLanguage = (state: RootState) => state.settings.lang
export const selectHideLayoutWarning = (state: RootState) =>
  state.settings.hideLayoutWarning

export const { setLanguage, disableHideLayoutWarning } = settingsSlice.actions

export default settingsSlice.reducer
