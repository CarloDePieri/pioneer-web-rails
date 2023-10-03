import { useAppSelector } from "../../../app/hooks"
import { selectGoals } from "../gameSlice"

export function Goals() {
  const goals = useAppSelector(selectGoals)

  return (
    <p>
      Goals: {goals.sheriff?.id} {goals.ranch?.id} {goals.train?.id}
    </p>
  )
}