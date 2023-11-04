import React, { CSSProperties, PropsWithChildren } from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectSecretCardUrl } from "./advancedSlice"

interface Props extends PropsWithChildren<any> {
  style?: CSSProperties
}

export function AdvancedGalleryHiddenCard({ style }: Readonly<Props>) {
  const cardUrl = useAppSelector(selectSecretCardUrl)
  return <img style={{ ...style }} src={cardUrl} alt="secret card" />
}
