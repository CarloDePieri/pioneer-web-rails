import { Card } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { ParseKeys } from "i18next"
import React, { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { openGoalsGallery } from "../../gallery/gallerySlice"
import { selectConfigCompany } from "../gameSlice"
import { Goal } from "./gameGoals"

interface Props extends PropsWithChildren<any> {
  goal: Goal
}

export function GoalCard({ goal }: Props) {
  const dispatch = useAppDispatch()
  let company = useAppSelector(selectConfigCompany)
  const theme = useTheme()
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"))
  const { t } = useTranslation()

  // TODO refactor this when the company cards are ready
  const goalCardSize = () => {
    if (company) {
      if (largeScreen) {
        return {
          width: "7vw",
        }
      } else {
        return {}
      }
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
        alt={t(("goals." + goal.id) as ParseKeys)}
        onClick={() => {
          dispatch(openGoalsGallery())
        }}
      />
    </Card>
  )
}
