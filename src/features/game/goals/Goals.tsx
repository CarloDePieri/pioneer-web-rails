import { Stack } from "@mui/material"
import React from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectGoals } from "../gameSlice"
import { Goal } from "./gameGoals"
import { GoalCard } from "./GoalCard"

export function Goals() {
  const goals = useAppSelector(selectGoals)

  // note: when this is called goals are already defined and won't change
  const goalsList = [
    goals.sheriff as Goal,
    goals.ranch as Goal,
    goals.train as Goal,
  ]

  return (
    <Stack
      direction={{ xs: "row", sm: "column" }}
      spacing={3}
      justifyContent="center"
      alignItems={"center"}
    >
      {goalsList.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </Stack>
  )
}
