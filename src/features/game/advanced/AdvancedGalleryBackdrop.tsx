import { Backdrop } from "@mui/material"
import React, { PropsWithChildren } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  closeAdvancedGallery,
  selectAdvancedGalleryOpen,
} from "./advancedSlice"

interface Props extends PropsWithChildren<any> {
  children: string | React.JSX.Element
}

export function AdvancedGalleryBackdrop({ children }: Readonly<Props>) {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectAdvancedGalleryOpen)

  return (
    <Backdrop
      sx={{
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
      onClick={() => {
        dispatch(closeAdvancedGallery())
      }}
    >
      {children}
    </Backdrop>
  )
}
