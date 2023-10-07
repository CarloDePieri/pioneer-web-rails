import { Card, Stack, Typography } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import React, { PropsWithChildren } from "react"
import { Goal } from "./gameGoals"

interface Props extends PropsWithChildren<any> {
  goal: Goal
}

export function GoalCard({ goal }: Props) {
  if (goal.img) {
    return (
      <Card
        elevation={0}
        sx={{
          width: {
            xs: "15vw",
            sm: "7vw",
          },
        }}
      >
        <CardMedia
          component="img"
          image={goal.img}
          alt={goal.description}
          onClick={() => {}}
        />
      </Card>
    )
  } else {
    return (
      <Card
        elevation={5}
        sx={{
          width: {
            xs: "15vw",
            sm: "7vw",
          },
          height: {
            xs: "20vw",
            sm: "9vw",
          },
          textAlign: "center",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ height: "100%" }}
        >
          <Typography variant={"h6"} fontWeight={"bold"} gutterBottom>
            {goal.id.replace("goal", "")}
          </Typography>
          <ZoomInIcon />
        </Stack>
      </Card>
    )
  }
}
