import { Backdrop, Grid, Stack } from "@mui/material"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { AdvancedCardSelector } from "./AdvancedCardSelector"
import {
  closeAdvancedGallery,
  selectAdvancedGalleryOpen,
} from "./advancedSlice"

export function AdvancedGallery() {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectAdvancedGalleryOpen)

  return (
    <Backdrop
      sx={{
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
      onClick={() => {
        dispatch(closeAdvancedGallery())
      }}
    >
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <AdvancedCardSelector />
          </Stack>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Backdrop>
  )
}
