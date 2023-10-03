import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  reset,
  selectDealer,
  selectDeck,
  selectDiscard,
  selectGoals,
  selectRound,
  selectStatus,
  selectTurn,
} from "./gameSlice"
import { NewGame } from "./components/NewGame"
import { OperationBar } from "./components/OperationBar"
import { Display } from "./components/Display"
import { CompanyCard } from "./components/CompanyCard";
import { Goals } from "./goals/Goals"

export function Game() {
  const status = useAppSelector(selectStatus)
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
