import { CompanyId, companyIds } from "../game/company/Company"
import { CardId, cardIds } from "../game/deck/CardId"
import { GoalId, goalIds } from "../game/goals/Goal"

export class DeckTheme {
  readonly deck: Record<CardId, string>
  readonly goals: Record<GoalId, string>
  readonly company: Record<CompanyId, string>
  readonly back: string

  constructor(
    deck: Record<CardId, string>,
    company: Record<CompanyId, string>,
    goals: Record<GoalId, string>,
    back: string,
  ) {
    this.deck = deck
    this.company = company
    this.goals = goals
    this.back = back
  }

  getImageById = {
    deck: (id: CardId) => {
      return this.deck[id]
    },
    company: (id: CompanyId) => {
      return this.company[id]
    },
    goal: (id: GoalId) => {
      return this.goals[id]
    },
    back: () => this.back,
  }
}

export abstract class DefaultDeckThemeBuilder {
  abstract name: string
  abstract back: string
  abstract companyUrl(name: string): string
  abstract goalUrl(name: string): string
  abstract deckUrl(name: string): string

  _buildSection<T extends string>(
    idList: T[],
    urlComposer: (id: T) => string,
  ): Record<T, string> {
    return idList
      .map((id: T) => {
        return { [id]: urlComposer(id) } as Record<T, string>
      })
      .reduce((result, current) => {
        return Object.assign(result, current)
      }, {} as Record<T, string>)
  }

  init(): DeckTheme {
    return new DeckTheme(
      // deck
      this._buildSection([...cardIds], this.deckUrl.bind(this)),
      // company
      this._buildSection([...companyIds], this.companyUrl.bind(this)),
      // goals
      this._buildSection([...goalIds], this.goalUrl.bind(this)),
      // back
      this.back,
    )
  }
}
