import {
  DeckTheme,
  DefaultDeckThemeBuilder,
} from "../../features/settings/DeckTheme"

class OpenThemeBuilder extends DefaultDeckThemeBuilder {
  name: string = "original"
  _rootPath: string = "/images/publicDomain"
  back: string = `${this._rootPath}/deck/back.svg`

  companyUrl(name: string): string {
    return `${this._rootPath}/company/${name}.png`
  }
  goalUrl(name: string): string {
    return `${this._rootPath}/goals/${name}.png`
  }

  deckUrl(name: string): string {
    return `${this._rootPath}/deck/${name}.svg`
  }
}

export const openThemeBuilder: DeckTheme = new OpenThemeBuilder().init()
