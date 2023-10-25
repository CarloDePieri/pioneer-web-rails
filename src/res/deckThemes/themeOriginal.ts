import {
  DeckTheme,
  DefaultDeckThemeBuilder,
} from "../../features/settings/DeckTheme"

class OriginalThemeBuilder extends DefaultDeckThemeBuilder {
  name: string = "original"
  _rootPath: string = "/images/licensed"
  back: string = `${this._rootPath}/deck/back.png`

  companyUrl(name: string): string {
    return `${this._rootPath}/company/${name}.png`
  }
  goalUrl(name: string): string {
    return `${this._rootPath}/goals/${name}.png`
  }

  deckUrl(name: string): string {
    return `${this._rootPath}/deck/${name}.png`
  }
}

export const originalThemeBuilder: DeckTheme = new OriginalThemeBuilder().init()
