import * as ex from 'excalibur'

import { Game, Menu, Scene } from '@core'

import TitleMenu from './TitleScene.menu'

const Keys = ex.Input.Keys

export default class TitleScene extends Scene {
  private titleMenu?: Menu

  constructor(game: Game) {
    super(game, 'Title Scene')
  }

  onActivate(a, b) {
    super.onActivate(a, b)

    this.titleMenu = new TitleMenu()
    this.titleMenu.init()
    this.add(this.titleMenu)
  }

  onPreUpdate(game: Game) {
    const k = game.input.keyboard

    if (k.wasPressed(Keys.Space)) {
      game.changeScene('game')
    }
  }
}
