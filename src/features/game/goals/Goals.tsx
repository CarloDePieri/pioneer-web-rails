import { Stack } from "@mui/material"
import React from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectGoals } from "../gameSlice"
import { GoalCard } from "./GoalCard"

export function Goals() {
  const goals = useAppSelector(selectGoals)
  const goalsList = [goals.sheriff, goals.ranch, goals.train]

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
