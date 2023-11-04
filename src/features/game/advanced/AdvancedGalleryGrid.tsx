import { Container, Grid, Stack } from "@mui/material"
import React, { PropsWithChildren } from "react"
import useIsLargeScreen from "../../theme/useIsLargeScreen"

interface Props extends PropsWithChildren<any> {
  children: string | React.JSX.Element
}

export function AdvancedGalleryGrid({ children }: Readonly<Props>) {
  const isLargeScreen = useIsLargeScreen()

  if (isLargeScreen) {
    return (
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Stack direction="row" justifyContent="center" alignItems="center">
            {children}
          </Stack>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    )
  } else {
    return <Container style={{ width: "90vw" }}>{children}</Container>
  }
}
