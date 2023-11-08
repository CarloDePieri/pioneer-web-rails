import React from "react"
import { useAppSelector } from "../../../app/hooks"
import { selectConfigCompany, selectGoals } from "../gameSlice"
import { AppBackdrop } from "../../shared/AppBackdrop"
import { GalleryCompanyCard } from "./GalleryCompanyCard"
import { GalleryGoalCard } from "./GalleryGoalCard"
import { GalleryGrid } from "./GalleryGrid"
import {
  closeGallery,
  selectGalleryOpen,
  selectGalleryWindow,
} from "./gallerySlice"

export function Gallery() {
  const goals = useAppSelector(selectGoals)
  const window = useAppSelector(selectGalleryWindow)
  const company = useAppSelector(selectConfigCompany)

  // note: when this is called goals are already defined and won't change
  const goalsList = [goals.sheriff, goals.ranch, goals.train]

  const companyCard = company ? <GalleryCompanyCard /> : <></>
  const goalCards = goalsList.map((goal) => {
    return <GalleryGoalCard key={goal.id} goal={goal} />
  })

  return (
    <AppBackdrop openSelector={selectGalleryOpen} closeAction={closeGallery}>
      <GalleryGrid>{window === "goals" ? goalCards : companyCard}</GalleryGrid>
    </AppBackdrop>
  )
}
