import CheckIcon from "@mui/icons-material/Check"
import ClearIcon from "@mui/icons-material/Clear"
import LightModeIcon from "@mui/icons-material/LightMode"
import ForestIcon from "@mui/icons-material/Forest"

import { Button, ButtonProps, Grid } from "@mui/material"
import React, { PropsWithChildren } from "react"

type variantType = ButtonProps["variant"]
type colorType = ButtonProps["color"]
type iconType = "desert" | "forest" | "on" | "off"

interface Props extends PropsWithChildren<any> {
  on: boolean
  handleClick: () => void
  children: string
  variantOn?: variantType
  variantOff?: variantType
  colorOn?: colorType
  colorOff?: colorType
  iconOn?: iconType
  iconOff?: iconType
  textOff?: string
}

export function GridOption({
  on,
  handleClick,
  children,
  variantOn = "contained",
  variantOff = "outlined",
  colorOn = "primary",
  colorOff = "error",
  iconOn = "on",
  iconOff = "off",
  textOff = undefined,
}: Readonly<Props>) {
  const buttonTextOn = children
  let buttonTextOff
  if (textOff === undefined) buttonTextOff = children
  else buttonTextOff = textOff

  function getIcon(name: iconType) {
    switch (name) {
      case "on":
        return <CheckIcon />
      case "off":
        return <ClearIcon />
      case "desert":
        return <LightModeIcon />
      case "forest":
        return <ForestIcon />
    }
  }

  return (
    <React.Fragment>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Button
          style={{ width: "100%" }}
          startIcon={on ? getIcon(iconOn) : getIcon(iconOff)}
          variant={on ? variantOn : variantOff}
          color={on ? colorOn : colorOff}
          onClick={handleClick}
        >
          {on ? buttonTextOn : buttonTextOff}
        </Button>
      </Grid>
      <Grid item xs={2} />
    </React.Fragment>
  )
}
