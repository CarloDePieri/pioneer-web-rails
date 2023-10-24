import { Box, Card, Stack, Typography } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { ParseKeys } from "i18next"
import React, { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"
import { Goal } from "../game/goals/gameGoals"

interface Props extends PropsWithChildren<any> {
  goal: Goal
}
export function GalleryGoalCard({ goal }: Props) {
  const { t } = useTranslation()
  const description = t(`goals.${goal.id}` as ParseKeys)
  const theme = useTheme()
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"))

  if (largeScreen) {
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
          <CardMedia component="img" image={goal.img} alt={description} />
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
          image={goal.img}
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
