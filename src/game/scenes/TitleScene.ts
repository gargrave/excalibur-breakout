import * as ex from 'excalibur'

import { Game } from '../../core'

const Keys = ex.Input.Keys

export default class TitleScene extends ex.Scene {
  update(game: Game) {
    const k = game.input.keyboard

    if (k.wasPressed(Keys.Space)) {
      game.changeScene('game')
    }
  }
}
