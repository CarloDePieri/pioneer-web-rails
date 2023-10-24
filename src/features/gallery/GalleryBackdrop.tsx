import { Backdrop } from "@mui/material"
import React, { PropsWithChildren } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { closeGallery, selectGalleryOpen } from "./gallerySlice"

interface Props extends PropsWithChildren<any> {
  children: string | React.JSX.Element
}

export function GalleryBackdrop({ children }: Props) {
  const open = useAppSelector(selectGalleryOpen)
  const dispatch = useAppDispatch()

  return (
    <Backdrop
      sx={{
        backgroundColor: "rgba(0,0,0,0.7)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
      onClick={() => {
        dispatch(closeGallery())
      }}
    >
      {children}
    </Backdrop>
  )
}
