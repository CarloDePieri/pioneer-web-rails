import { Box, Card, CardContent, Typography } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../../../app/hooks"
import useIsLargeScreen from "../../../theme/useIsLargeScreen"
import { selectSecretCards, selectTurn } from "../../gameSlice"
import { AdvancedPlayingCard } from "./AdvancedPlayingCard"
import { GameCard } from "../gameDeck"

export function DisplayAdvanced() {
  const turn = useAppSelector(selectTurn)
  const secretCards = useAppSelector(selectSecretCards)
  const secretCardsArray = Array.from(secretCards.entries())
  const { t } = useTranslation()
  const isLargeScreen = useIsLargeScreen()

  if (turn === 0) {
    return (
      <Box
        sx={{
          width: {
            xs: "65%",
            sm: "100%",
          },
        }}
      >
        <Card elevation={3}>
          <CardContent>
            <Typography variant={"h5"} gutterBottom>
              {t("advanced.display.title")}
            </Typography>
            <Typography variant={"body1"}>
              {t("advanced.display.body1")}
            </Typography>
            <Typography variant={"body1"} gutterBottom>
              {t("advanced.display.body2")}
            </Typography>
            <Typography variant={"body1"} fontWeight={"bold"}>
              {t("advanced.display.body3")}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    )
  } else if (turn === 5) {
    return (
      <Box
        sx={{
          width: isLargeScreen ? "100%" : "70vw",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {secretCardsArray.map(([playerId, card]) => {
          const secretCard = card as GameCard // I'm sure it's defined
          return (
            <AdvancedPlayingCard
              sx={{
                margin: 2,
                width: {
                  xs: "50vw",
                  sm: secretCardsArray.length >= 4 ? "14vw" : "19vw",
                },
              }}
              key={secretCard.id}
              card={secretCard}
              playerId={playerId}
            />
          )
        })}
      </Box>
    )
  }
}
