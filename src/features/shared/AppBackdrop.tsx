import { Backdrop } from "@mui/material"
import { ActionCreator } from "@reduxjs/toolkit"
import React, { PropsWithChildren } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"

interface Props extends PropsWithChildren<any> {
  openSelector: (state: RootState) => boolean
  closeAction: ActionCreator<any>
  children: string | React.JSX.Element
}

export function AppBackdrop({
  children,
  openSelector,
  closeAction,
}: Readonly<Props>) {
  const dispatch = useAppDispatch()
  const open = useAppSelector(openSelector)

  return (
    <Backdrop
      sx={{
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
      onClick={() => {
        dispatch(closeAction())
      }}
    >
      {children}
    </Backdrop>
  )
}
