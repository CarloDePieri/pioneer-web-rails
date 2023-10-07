import { Backdrop, Grid } from "@mui/material"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectConfigCompany } from "../game/gameSlice"
import { GallerySingle } from "./GallerySingle"
import { closeGallery, selectGalleryOpen } from "./gallerySlice"
import { GallerySplit } from "./GallerySplit"
export function Gallery() {
  const open = useAppSelector(selectGalleryOpen)
  const dispatch = useAppDispatch()
  const company = useAppSelector(selectConfigCompany)

  return (
    <Backdrop
      sx={{
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
      onClick={() => {
        dispatch(closeGallery())
      }}
    >
      {!company ? <GallerySingle /> : <GallerySplit />}
    </Backdrop>
  )
}
