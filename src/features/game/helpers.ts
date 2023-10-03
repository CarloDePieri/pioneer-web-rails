export function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

export function randomIndex<T>(array: T[]): number {
  return Math.floor(Math.random() * array.length)
}

export function pickRandom<T>(array: T[]): T {
  return array[randomIndex(array)]
}