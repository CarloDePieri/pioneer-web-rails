import { useAppDispatch } from "../../../app/hooks"

import { deal, init } from "../gameSlice"

export function NewGame() {
  const dispatch = useAppDispatch()

  return (
    <div>
      <p>A new game?</p>
      <button
        onClick={() => {
          dispatch(
            init({
              players: ["Carlo", "Giulia", "Andrea", "Silvia"],
              config: {
                forestMap: false,
                jokerExpansion: false,
                companyOwnerExpansion: false,
                advancedHandCardRule: false,
              },
            }),
          )
          dispatch(deal())
        }}
      >
        New Game
      </button>
      <button
        onClick={() => {
          dispatch(
            init({
              players: ["Carlo", "Giulia"],
              config: {
                forestMap: false,
                jokerExpansion: true,
                companyOwnerExpansion: false,
                advancedHandCardRule: false,
              },
            }),
          )
          dispatch(deal())
        }}
      >
        New Game with Jokers
      </button>
    </div>
  )
}
