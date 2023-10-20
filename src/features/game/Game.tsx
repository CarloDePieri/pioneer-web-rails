import { Box, Container, Grid } from "@mui/material"
import { useAppSelector } from "../../app/hooks"
import { AdvancedCard } from "./advanced/AdvancedCard"
import { AdvancedGallery } from "./advanced/AdvancedGallery"
import { CompanyCardHolder } from "./company/CompanyCardHolder"
import { FlowButtons } from "./flow/FlowButtons"
import { Gallery } from "../gallery/Gallery"
import { FlowTextBar } from "./flow/FlowTextBar"
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
        <React.Fragment>
          <Gallery />
          <AdvancedGallery />
          <Grid container spacing={2} mt={4} mb={8} height={"100%"}>
            <Grid item xs={2}>
              <CompanyCardHolder />
              <Goals />
            </Grid>
            <Grid item xs={8}>
              <Box position={"fixed"} sx={{ width: "66vw", zIndex: 10 }}>
                <FlowTextBar />
              </Box>
              <Container>
                <Box mt={36}>
                  <Display />
                </Box>
              </Container>
            </Grid>
            <Grid item xs={2}>
              <Box position={"fixed"} pl={16}>
                <FlowButtons />
              </Box>
            </Grid>
          </Grid>
        </React.Fragment>
      )
    }
    return (
      <div>
        <Goals />
        {/*<CompanyCardHolder />*/}
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
