import Fingerprint from "@mui/icons-material/Fingerprint"
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectPlayers } from "../gameSlice"
import {
  pickAdvancedGalleryPlayer,
  resetAdvancedGalleryPlayer,
  selectAdvancedGalleryIsCardShown,
  selectAdvancedGalleryPlayerId,
  selectSecretCardUrl,
  toggleCard,
} from "./advancedSlice"
import useLongPress from "./useLongPress"

export function AdvancedCardSelector() {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const players = useAppSelector(selectPlayers)
  const cardUrl = useAppSelector(selectSecretCardUrl)
  const isCardShown = useAppSelector(selectAdvancedGalleryIsCardShown)
  const playerId = useAppSelector(selectAdvancedGalleryPlayerId)

  const onLongPressButton = useLongPress<HTMLButtonElement, string>(
    {
      onLongPress() {
        dispatch(toggleCard())
      },
      onClick() {
        if (isCardShown) {
          dispatch(toggleCard())
          dispatch(resetAdvancedGalleryPlayer())
        }
      },
    },
    { delay: 500 },
  )

  return (
    <Card
      style={{ width: "63vw", height: "70vh", display: "flex" }}
      onClick={(event) => event.stopPropagation()}
    >
      <img src={cardUrl} alt="secret card" />
      <CardContent sx={{ width: "50vw" }}>
        <Stack
          sx={{ height: "100%" }}
          justifyContent="center"
          alignItems="center"
        >
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Player</InputLabel>
            <Select
              disabled={isCardShown}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={playerId ?? ""}
              label="Player"
              onChange={(event) =>
                dispatch(pickAdvancedGalleryPlayer(event.target.value))
              }
            >
              {players.map((player) => {
                return (
                  <MenuItem key={player.id} value={player.id}>
                    {player.name}
                  </MenuItem>
                )
              })}
            </Select>
            <FormHelperText
              hidden={playerId !== undefined}
              sx={{ color: theme.palette.primary.main }}
            >
              Select a player
            </FormHelperText>
            <Button
              fullWidth
              variant={isCardShown ? "outlined" : "contained"}
              size={"large"}
              disabled={playerId === undefined}
              sx={{ mt: "5vh" }}
              {...onLongPressButton(playerId)}
            >
              <Fingerprint />
            </Button>
            <FormHelperText
              hidden={playerId === undefined}
              sx={{ color: theme.palette.primary.main }}
            >
              {isCardShown ? "Press again to hide" : "Hold to show"}
            </FormHelperText>
          </FormControl>
        </Stack>
      </CardContent>
    </Card>
  )
}
