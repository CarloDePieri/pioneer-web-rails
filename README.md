# Pioneer Web Rails
[![Prod](https://github.com/CarloDePieri/pioneer-web-rails/actions/workflows/prod.yml/badge.svg)](https://github.com/CarloDePieri/pioneer-web-rails/actions/workflows/prod.yml)
[![Deploy](https://github.com/CarloDePieri/pioneer-web-rails/actions/workflows/deploy.yml/badge.svg)](https://github.com/CarloDePieri/pioneer-web-rails/actions/workflows/deploy.yml)
![Maintenance](https://img.shields.io/maintenance/yes/2024)

This is a companion web app for the board game [Pioneer Rails](https://boardgamegeek.com/boardgame/362164/pioneer-rails) by [Dranda Games](https://www.drandagames.co.uk/).

The app is available [on GitHub Pages](https://carlodepieri.github.io/pioneer-web-rails/).

It allows to play without physical cards, while the board is still needed (either physical or digital).
The app keeps track of the game state (which and whose turn it is, active objectives, secret cards), and provides a way
to draw and pick cards.

## How to use it

The web app can be installed on your device as a PWA (Progressive Web App) by using the install button in the address bar.
This will allow you to use it offline and have a more app-like experience.

The ui in landscape mode is better organized, so make sure to rotate your device if it's feeling cramped.

### Game setup

The first screen is the game setup, where you can choose the number of players, the map (which determines the objectives)
and the game mode. All game mode present in the rules are available as an option.

During or after a game, this screen can be accessed again by using the button in the top right corner shaped like a plus.

The second button in the top right corner is the settings page, where you can change the language of the ui and the theme.

### Game screen

A dedicated area can be found with the active objectives, which can be clicked to see a textual description.

Every turn, three new cards are drawn and placed on the table. The dealer must choose one of them for themselves by
clicking on it, while the other two are available to the other players.

After the game action on the board it's time to draw again!

Two buttons are available to rewind / redo actions if a mistake was made.

## Assets licensing

The deck of playing cards are from the [public domain](https://tekeye.uk/playing_cards/svg-playing-cards).

All other images are licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1).