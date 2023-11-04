import { Card } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import React, { PropsWithChildren } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { openGoalsGallery } from "../../gallery/gallerySlice"
import useIsLargeScreen from "../../theme/useIsLargeScreen"
import { selectConfigCompany } from "../gameSlice"

import { Goal } from "./Goal"

interface Props extends PropsWithChildren<any> {
  goal: Goal
}

export function GoalCard({ goal }: Readonly<Props>) {
  const dispatch = useAppDispatch()
  let company = useAppSelector(selectConfigCompany)
  const isLargeScreen = useIsLargeScreen()

  const goalCardSize = () => {
    if (isLargeScreen) {
      if (company) {
        return {
          width: "7vw",
        }
      } else {
        return {
          width: "9vw",
        }
      }
    } else {
      // with small screen, the flex handle the card dimensions
      return {}
    }
  }

  return (
    <Card
      elevation={5}
      sx={{
        ...goalCardSize(),
      }}
    >
      <CardMedia
        component="img"
        image={goal.img}
        alt={goal.description}
        onClick={() => {
          dispatch(openGoalsGallery())
        }}
      />
    </Card>
  )
}
