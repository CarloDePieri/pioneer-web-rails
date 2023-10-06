import { createTheme } from "@mui/material/styles"
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export function getTheme(darkTheme: boolean) {
  const dark = createTheme({
    spacing: 2,
    palette: {
      mode: "dark",
    },
  })
  const light = createTheme({
    spacing: 2,
    palette: {
      mode: "light",
    },
  })
  return darkTheme ? dark : light
}

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkTheme: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme
    },
  },
})

export const selectTheme = (state: RootState) => state.interface.theme.darkTheme

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
