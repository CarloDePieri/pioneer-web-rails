import { useAppDispatch } from "../../../app/hooks"

import { deal, dealSecrets, init, newRound } from "../gameSlice";

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
                companyOwnersExpansion: false,
                advancedHandCardRule: false,
              },
            }),
          )
          dispatch(newRound())
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
                companyOwnersExpansion: false,
                advancedHandCardRule: false,
              },
            }),
          )
          dispatch(newRound())
          dispatch(deal())
        }}
      >
        New Game with Jokers
      </button>
      <button
        onClick={() => {
          dispatch(
            init({
              players: ["Carlo", "Giulia"],
              config: {
                forestMap: false,
                jokerExpansion: false,
                companyOwnersExpansion: true,
                advancedHandCardRule: true,
              },
            }),
          )
          dispatch(newRound())
          // dispatch(deal())
          dispatch(dealSecrets())
        }}
      >
        New Game with Company Owners
      </button>
    </div>
  )
}
