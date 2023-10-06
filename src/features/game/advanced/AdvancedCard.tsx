import { useAppSelector } from "../../../app/hooks"
import {
  selectAdvancedHandCardRule,
  selectNextOp,
  selectSecretCards,
  selectTurn,
} from "../gameSlice"

export function AdvancedCard() {
  const advanced = useAppSelector(selectAdvancedHandCardRule)
  const secrets = useAppSelector(selectSecretCards)
  const next = useAppSelector(selectNextOp)
  const turn = useAppSelector(selectTurn)

  if (advanced) {
    if (turn === 5 && (next === "NEW_ROUND" || next === "END_GAME")) {
      return (
        <div>
          {Array.from(secrets.entries()).map(([name, card]) => (
            <p key={card?.id}>
              {" "}
              {name}: {card?.symbol}
            </p>
          ))}
        </div>
      )
    } else {
      return (
        <div>
          <p>uhm</p>
        </div>
      )
    }
  } else {
    return <div></div>
  }
}
