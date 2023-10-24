import React from "react"
import { useAppSelector } from "../../app/hooks"
import { selectConfigCompany, selectGoals } from "../game/gameSlice"
import { Goal } from "../game/goals/gameGoals"
import { GalleryBackdrop } from "./GalleryBackdrop"
import { GalleryCompanyCard } from "./GalleryCompanyCard"
import { GalleryGoalCard } from "./GalleryGoalCard"
import { GalleryGrid } from "./GalleryGrid"
import { selectGalleryWindow } from "./gallerySlice"

export function Gallery() {
  const goals = useAppSelector(selectGoals)
  const window = useAppSelector(selectGalleryWindow)
  const company = useAppSelector(selectConfigCompany)

  // note: when this is called goals are already defined and won't change
  const goalsList = [
    goals.sheriff as Goal,
    goals.ranch as Goal,
    goals.train as Goal,
  ]

  const companyCard = company ? <GalleryCompanyCard /> : <></>
  const goalCards = goalsList.map((goal) => {
    return <GalleryGoalCard key={goal.id} goal={goal} />
  })

  return (
    <GalleryBackdrop>
      <GalleryGrid>{window === "goals" ? goalCards : companyCard}</GalleryGrid>
    </GalleryBackdrop>
  )
}
