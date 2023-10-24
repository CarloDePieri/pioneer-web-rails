import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { themeSlice } from "../theme/themeSlice"

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    lang: "en-US",
  },
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload
    },
  },
})

export const selectLanguage = (state: RootState) => state.settings.lang

export const { setLanguage } = settingsSlice.actions

export default settingsSlice.reducer
