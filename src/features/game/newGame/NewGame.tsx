import { Box, Grid } from "@mui/material"
import React from "react"
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
  const dispatch = useAppDispatch()

  return (
    <Box pb={24}>
      <Grid container spacing={2}>
        <GridHeading size={"h4"} side={1}>
          New Game Setup
        </GridHeading>

        <GridHeading size={"h6"}>Map type</GridHeading>
        <GridOption
          on={useAppSelector(selectConfigForest)}
          handleClick={() => dispatch(toggleConfigForest())}
          variantOff={"contained"}
          colorOff={"warning"}
          colorOn={"success"}
          iconOff={"desert"}
          iconOn={"forest"}
          textOff={"Desert"}
        >
          Forest
        </GridOption>

        <GridHeading size={"h6"}>Variants</GridHeading>
        <GridOption
          on={useAppSelector(selectConfigJokers)}
          handleClick={() => dispatch(toggleConfigJokers())}
        >
          Jokers
        </GridOption>
        <GridOption
          on={useAppSelector(selectConfigCompany)}
          handleClick={() => dispatch(toggleConfigCompany())}
        >
          Company Owners
        </GridOption>
        <GridOption
          on={useAppSelector(selectConfigAdvanced)}
          handleClick={() => dispatch(toggleConfigAdvanced())}
        >
          Advanced Hand
        </GridOption>

        <PlayerList />

        <NewGameStartButton />
      </Grid>
    </Box>
  )
}
