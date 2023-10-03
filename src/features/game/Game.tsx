import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { CompanyCard } from "./company/CompanyCard"
import {
  reset,
  selectDealer,
  selectDeck,
  selectDiscard,
  selectRound,
  selectGameStatus,
  selectTurn,
} from "./gameSlice"
import { NewGame } from "./components/NewGame"
import { OperationBar } from "./flow/OperationBar"
import { Display } from "./components/Display"
import { Goals } from "./goals/Goals"

export function Game() {
  const status = useAppSelector(selectGameStatus)
  const dispatch = useAppDispatch()

  const deck = useAppSelector(selectDeck)
  const discard = useAppSelector(selectDiscard)
  const dealer = useAppSelector(selectDealer)
  const round = useAppSelector(selectRound)
  const turn = useAppSelector(selectTurn)

  if (status === "pre") {
    return <NewGame />
  } else {
    return (
      <div>
        <button onClick={() => dispatch(reset())}>Reset Game</button>
        <Goals />
        <CompanyCard />
        <OperationBar />
        <p>
          Round: {round} Turn: {turn} Dealer: {dealer}
        </p>
        <Display />
        <p>Deck:</p>
        <ul>
          {deck.map((card) => (
            <li key={card.id}>{card.id}</li>
          ))}
        </ul>
        <p>Discard:</p>
        <ul>
          {discard.map((card) => (
            <li key={card.id}>{card.id}</li>
          ))}
        </ul>
      </div>
    )
  }
}
