import { Box, Grid } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  selectConfigAdvanced,
  selectConfigCompany,
  selectConfigForest,
  selectConfigJokers,
  toggleConfigAdvanced,
  toggleConfigCompany,
  toggleConfigForest,
  toggleConfigJokers,
} from "../gameSlice"
import { GridHeading } from "./GridHeading"
import { GridOption } from "./GridOption"
import { NewGameStartButton } from "./NewGameStartButton"
import { PlayerList } from "./PlayerList"

export function NewGame() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  return (
    <Box pb={24}>
      <Grid container spacing={2}>
        <GridHeading size={"h4"}>{t("newGame.setup.title")}</GridHeading>

        <GridHeading size={"h6"}>{t("newGame.setup.map.heading")}</GridHeading>
        <GridOption
          on={useAppSelector(selectConfigForest)}
          handleClick={() => dispatch(toggleConfigForest())}
          variantOff={"contained"}
          colorOff={"warning"}
          colorOn={"success"}
          iconOff={"desert"}
          iconOn={"forest"}
          textOff={t("newGame.setup.map.desert")}
        >
          {t("newGame.setup.map.forest")}
        </GridOption>

        <GridHeading size={"h6"}>
          {t("newGame.setup.variants.heading")}
        </GridHeading>
        <GridOption
          on={useAppSelector(selectConfigJokers)}
          handleClick={() => dispatch(toggleConfigJokers())}
        >
          {t("newGame.setup.variants.jokers")}
        </GridOption>
        <GridOption
          on={useAppSelector(selectConfigCompany)}
          handleClick={() => dispatch(toggleConfigCompany())}
        >
          {t("newGame.setup.variants.company")}
        </GridOption>
        <GridOption
          on={useAppSelector(selectConfigAdvanced)}
          handleClick={() => dispatch(toggleConfigAdvanced())}
        >
          {t("newGame.setup.variants.advanced")}
        </GridOption>

        <PlayerList />

        <NewGameStartButton />
      </Grid>
    </Box>
  )
}
