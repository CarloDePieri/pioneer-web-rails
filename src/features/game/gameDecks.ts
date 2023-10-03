import { Card, CompanyCard } from "./gameModel"

export const cardsDeck: Card[] = [
  { id: "🂡", img: "aceSpades.png" },
  { id: "🂮", img: "kingSpades.png" },
  { id: "🂭", img: "queenSpades.png" },
  { id: "🂫", img: "jackSpades.png" },
  { id: "🂪", img: "tenSpades.png" },
  { id: "🂱", img: "aceHearts.png" },
  { id: "🂾", img: "kingHearts.png" },
  { id: "🂽", img: "queenHearts.png" },
  { id: "🂻", img: "jackHearts.png" },
  { id: "🂺", img: "tenHearts.png" },
  { id: "🃁", img: "aceDiamonds.png" },
  { id: "🃎", img: "kingDiamonds.png" },
  { id: "🃍", img: "queenDiamonds.png" },
  { id: "🃋", img: "jackDiamonds.png" },
  { id: "🃊", img: "tenDiamonds.png" },
  { id: "🃑", img: "aceClubs.png" },
  { id: "🃞", img: "kingClubs.png" },
  { id: "🃝", img: "queenClubs.png" },
  { id: "🃛", img: "jackClubs.png" },
  { id: "🃚", img: "tenClubs.png" },
]

export const jokers: Card[] = [
  { id: "🃏", img: "jokerClubsSpades.png" },
  { id: "🂿", img: "jokerDiamondsHearts.png" },
]

export const companyDeck: CompanyCard[] = [
  {
    id: "C1",
    img: "companyC1.png",
    description:
      "This round, Banks are completed with 2 tracks instead of 3 (Desert maps only).",
  },
  {
    id: "C2",
    img: "companyC2.png",
    description:
      "This round, when you draw track(s) around a Fort, draw an additional track.",
  },
  {
    id: "C3",
    img: "companyC3.png",
    description: "This round, Saloons are completed with 1 track instead of 2.",
  },
  {
    id: "C4",
    img: "companyC4.png",
    description:
      "This round, Poker hands score double (If you already have this bonus through an active Saloon, your Poker hand scores triple).",
  },
  {
    id: "C5",
    img: "companyC5.png",
    description:
      "This round, you may sacrifice 1 of your 3 tracks to extend from any Station.",
  },
  {
    id: "C6",
    img: "companyC6.png",
    description:
      "This round, you may draw 2 tracks instead of 3. If you do, 1 of the 2 tracks can be a Switch.",
  },
  {
    id: "C7",
    img: "companyC7.png",
    description:
      "This round, you may draw 2 tracks instead of 3. If you do, 1 of the 2 tracks can be a Bridge.",
  },
  {
    id: "C8",
    img: "companyC8.png",
    description:
      "This round, you may draw 2 tracks instead of 3. If you do, 1 of the 2 tracks can be a Tunnel.",
  },
  {
    id: "C9",
    img: "companyC9.png",
    description:
      "This round, you may draw 2 tracks instead of 3. If you do, 1 of the 2 tracks can be a Shortcut.",
  },
  {
    id: "C10",
    img: "companyC10.png",
    description:
      "This round, any Goals you complete score an additional 5 points.",
  },
]
