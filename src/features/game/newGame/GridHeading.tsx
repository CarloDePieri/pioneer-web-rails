import { Box, Container, Typography } from "@mui/material"
import { Variant } from "@mui/material/styles/createTypography"
import React, { PropsWithChildren } from "react"

interface Props extends PropsWithChildren<any> {
  size: Variant
  children: string | React.JSX.Element
}

export function GridHeading({ size, children }: Readonly<Props>) {
  return (
    <Container>
      <Box mt={8}>
        <Typography variant={size} align="center" gutterBottom>
          {children}
        </Typography>
      </Box>
    </Container>
  )
}
