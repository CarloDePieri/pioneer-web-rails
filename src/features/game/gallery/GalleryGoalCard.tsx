import { Box, Card, Stack, Typography } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import React, { PropsWithChildren } from "react"

import { Goal } from "../goals/Goal"
import useIsLargeScreen from "../../theme/useIsLargeScreen"

interface Props extends PropsWithChildren<any> {
  goal: Goal
}
export function GalleryGoalCard({ goal }: Readonly<Props>) {
  const isLargeScreen = useIsLargeScreen()

  const image = goal.img
  const description = goal.description

  if (isLargeScreen) {
    return (
      <Card elevation={5} onClick={(event) => event.stopPropagation()}>
        <Stack
          direction={"column-reverse"}
          style={{
            height: "100%",
          }}
        >
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            style={{
              flexGrow: 1,
              display: "flex",
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <Typography variant="caption" fontWeight={"bold"} align={"center"}>
              {description}
            </Typography>
          </Box>
          <CardMedia component="img" image={image} alt={description} />
        </Stack>
      </Card>
    )
  } else {
    return (
      <Card
        elevation={5}
        key={"gallery" + goal.id}
        style={{ display: "flex" }}
        onClick={(event) => event.stopPropagation()}
      >
        <CardMedia
          component="img"
          image={image}
          alt={description}
          sx={{ width: "60%" }}
        />
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          style={{
            flexGrow: 1,
            display: "flex",
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          <Typography variant="caption" fontWeight={"bold"} align={"center"}>
            {description}
          </Typography>
        </Box>
      </Card>
    )
  }
}
