import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  reset,
  selectDealer,
  selectDeck,
  selectDiscard,
  selectDisplay,
  selectObjectives,
  selectRound,
  selectStatus,
} from "./gameSlice"
import { NewGame } from "./components/NewGame"
import { OperationBar } from "./components/OperationBar";

export function Game() {
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()

  const objectives = useAppSelector(selectObjectives)
  const deck = useAppSelector(selectDeck)
  const display = useAppSelector(selectDisplay)
  const discard = useAppSelector(selectDiscard)
  const dealer = useAppSelector(selectDealer)
  const round = useAppSelector(selectRound)

  if (status === "pre") {
    return <NewGame />
  } else {
    return (
      <div>
        <button onClick={() => dispatch(reset())}>Reset Game</button>
        <p>
          Objectives: {objectives.sheriff?.id} {objectives.ranch?.id}{" "}
          {objectives.train?.id}
        </p>
        <OperationBar />
        <p>
          Round: {round} Dealer: {dealer}
        </p>
        <p>Display:</p>
        <ul>
          {display.map((card) => (
            <li key={card.id}>{card.id}</li>
          ))}
        </ul>
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
