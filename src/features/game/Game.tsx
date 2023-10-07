import { Grid } from "@mui/material"
import { useAppSelector } from "../../app/hooks"
import { AdvancedCard } from "./advanced/AdvancedCard"
import { CompanyCard } from "./company/CompanyCard"
import { FlowButtons } from "./flow/FlowButtons"
import {
  selectDealer,
  selectDeck,
  selectDiscard,
  selectRound,
  selectGameStatus,
  selectTurn,
} from "./gameSlice"
import { NewGame } from "./newGame/NewGame"
import { OperationBar } from "./flow/OperationBar"
import { Display } from "./deck/Display"
import { Goals } from "./goals/Goals"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import React from "react"

export function Game() {
  const status = useAppSelector(selectGameStatus)

  const deck = useAppSelector(selectDeck)
  const discard = useAppSelector(selectDiscard)
  const dealer = useAppSelector(selectDealer)
  const round = useAppSelector(selectRound)
  const turn = useAppSelector(selectTurn)

  const theme = useTheme()
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"))

  if (status === "pre") {
    return <NewGame />
  } else {
    if (largeScreen) {
      return (
        <Grid container spacing={2} mb={8} height={"100%"}>
          <Grid item xs={2}>
            <Goals />
          </Grid>
          <Grid item xs={8}>
            <p>
              Round: {round} Turn: {turn} Dealer: {dealer.name}
            </p>
            <Display />
          </Grid>
          <Grid item xs={2}>
            <FlowButtons />
          </Grid>
        </Grid>
      )
    }
    return (
      <div>
        <Goals />
        <CompanyCard />
        <AdvancedCard />
        <OperationBar />
        <p>
          Round: {round} Turn: {turn} Dealer: {dealer.name}
        </p>
        <Display />
        <p>Deck:</p>
        <ul>
          {deck.map((card) => (
            <li key={card.id}>
              {card.symbol}
              {/*<img*/}
              {/*  src={card.img}*/}
              {/*  alt=""*/}
              {/*  style={{ width: "300px", border: "solid 1px black" }}*/}
              {/*/>*/}
            </li>
          ))}
        </ul>
        <p>Discard:</p>
        <ul>
          {discard.map((card) => (
            <li key={card.id}>{card.symbol}</li>
          ))}
        </ul>
      </div>
    )
  }
}
