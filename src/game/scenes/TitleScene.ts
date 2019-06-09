import * as ex from 'excalibur'

import { Game } from '../../core'

const Keys = ex.Input.Keys

export default class TitleScene extends ex.Scene {
  onInitialize(game: Game) {
    super.onInitialize(game)
    console.log(
      `%cinitialize TitleScene`,
      'color:green;font-size:12px;background:lightyellow;padding:2px 4px;',
    )
  }

  onActivate() {
    console.log(
      `%cTitleScene onActivate()`,
      'color:green;font-size:12px;background:lightyellow;padding:2px 4px;',
    )
  }

  update(game: Game) {
    const k = game.input.keyboard

    if (k.wasPressed(Keys.Space)) {
      game.goToScene('game')
    }
  }
}
