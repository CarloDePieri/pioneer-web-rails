import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"

interface GalleryState {
  open: boolean
  window: "company" | "goals"
}

const initialState: GalleryState = {
  open: false,
  window: "goals",
}

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    openGoalsGallery: (state) => {
      state.open = true
      state.window = "goals"
    },
    openCompanyGallery: (state) => {
      state.open = true
      state.window = "company"
    },
    closeGallery: (state) => {
      state.open = false
    },
  },
})

export const selectGalleryOpen = (state: RootState) =>
  state.interface.gallery.open
export const selectGalleryWindow = (state: RootState) =>
  state.interface.gallery.window

export const { openGoalsGallery, openCompanyGallery, closeGallery } =
  gallerySlice.actions

export default gallerySlice.reducer
