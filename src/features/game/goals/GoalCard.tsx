import { Card, Stack, Typography } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import React, { PropsWithChildren } from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectCompanyCard, selectConfigCompany } from "../gameSlice"
import { Goal } from "./gameGoals"

interface Props extends PropsWithChildren<any> {
  goal: Goal
}

export function GoalCard({ goal }: Props) {
  let company = useAppSelector(selectConfigCompany)
  const theme = useTheme()
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"))

  const goalCardSize = () => {
    if (company) {
      return {}
    } else {
      if (largeScreen) {
        return {
          width: "9vw",
        }
      } else {
        return {}
      }
    }
  }

  if (goal.img) {
    return (
      <Card
        elevation={0}
        sx={{
          ...goalCardSize(),
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
