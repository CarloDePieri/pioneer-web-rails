import { Grid } from "@mui/material"
import React from "react"
import { GoalsGallery } from "./GoalsGallery"

export function GallerySingle() {
  return (
    <Grid container spacing={2} style={{ width: "100%" }}>
      <Grid item xs={2} />
      <Grid item xs={9}>
        <GoalsGallery />
      </Grid>
      <Grid item xs={2} />
    </Grid>
  )
}
