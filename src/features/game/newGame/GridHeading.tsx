import { Grid, Typography } from "@mui/material"
import { Variant } from "@mui/material/styles/createTypography"
import React, { PropsWithChildren } from "react"

interface Props extends PropsWithChildren<any> {
  size: Variant
  children: string | React.JSX.Element
  side?: number
}

export function GridHeading({ size, children, side = 2 }: Props) {
  return (
    <React.Fragment>
      <Grid item xs={side} />
      <Grid item xs={12 - side * 2} mt={8}>
        <Typography variant={size} align="center" gutterBottom>
          {children}
        </Typography>
      </Grid>
      <Grid item xs={side} />
    </React.Fragment>
  )
}
