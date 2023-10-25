import { CompanyId, companyIds } from "../game/company/Company"
import { GoalId, goalIds } from "../game/goals/Goal"

export class DeckTheme {
  readonly company: Record<CompanyId, string>
  readonly goals: Record<GoalId, string>
  readonly back: string

  constructor(
    company: Record<CompanyId, string>,
    goals: Record<GoalId, string>,
    back: string,
  ) {
    this.company = company
    this.goals = goals
    this.back = back
  }

  getImageById = {
    back: () => this.back,
    company: (id: CompanyId) => {
      return this.company[id]
    },
    goal: (id: GoalId) => {
      return this.goals[id]
    },
  }
}

export abstract class DefaultDeckThemeBuilder {
  abstract name: string
  abstract back: string
  abstract companyUrl(name: string): string
  abstract goalUrl(name: string): string

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
      // company
      this._buildSection([...companyIds], this.companyUrl.bind(this)),
      // goals
      this._buildSection([...goalIds], this.goalUrl.bind(this)),
      // back
      this.back,
    )
  }
}
