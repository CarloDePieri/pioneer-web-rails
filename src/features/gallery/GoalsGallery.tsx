import { Card, CardContent, Stack, Typography } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import { ParseKeys } from "i18next"
import React from "react"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../app/hooks"
import { selectGoals } from "../game/gameSlice"
import { Goal } from "../game/goals/gameGoals"

export function GoalsGallery() {
  const goals = useAppSelector(selectGoals)
  const { t } = useTranslation()

  // note: when this is called goals are already defined and won't change
  const goalsList = [
    goals.sheriff as Goal,
    goals.ranch as Goal,
    goals.train as Goal,
  ]

  return (
    <Stack direction={"row"} spacing={8}>
      {goalsList.map((goal) => {
        const description = t(`goals.${goal.id}` as ParseKeys)
        if (goal.img !== undefined) {
          return (
            <Card
              elevation={5}
              key={"gallery" + goal.id}
              style={{ width: "20vw" }}
              onClick={(event) => event.stopPropagation()}
            >
              <CardMedia component="img" image={goal.img} alt={description} />
              <CardContent>
                <Typography
                  variant="body2"
                  fontWeight={"bold"}
                  align={"center"}
                >
                  {description}
                </Typography>
              </CardContent>
            </Card>
          )
        } else {
          return (
            <Card
              key={goal.id}
              elevation={5}
              sx={{
                width: {
                  xs: "15vw",
                  sm: "20vw",
                },
                height: {
                  xs: "20vw",
                  sm: "41vw",
                },
                textAlign: "center",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={32}
                sx={{ height: "100%" }}
              >
                <Typography variant={"h5"} fontWeight={"bold"} gutterBottom>
                  {goal.id.replace("goal", "")}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={"bold"}
                  align={"center"}
                >
                  {description}
                </Typography>
              </Stack>
            </Card>
          )
        }
      })}
    </Stack>
  )
}
