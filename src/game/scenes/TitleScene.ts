import * as ex from 'excalibur'

import { globals } from '../../core'
import { Game } from '../../core'

const Keys = ex.Input.Keys

let center = { x: 0, y: 0 }

const titleLabel = () => {
  const label = new ex.Label()
  label.fontFamily = 'Sans-Serif'
  label.fontSize = 72
  label.color = ex.Color.Yellow
  label.fontUnit = ex.FontUnit.Px
  label.pos.setTo(center.x, center.y)
  label.textAlign = ex.TextAlign.Center
  label.text = 'BREAKOUT'
  return label
}

const startLabel = () => {
  const a = titleLabel()
  const label = new ex.Label()
  label.fontFamily = 'Sans-Serif'
  label.fontSize = 32
  label.color = ex.Color.White
  label.fontUnit = ex.FontUnit.Px
  label.pos.setTo(center.x, a.pos.y + a.fontSize)
  label.textAlign = ex.TextAlign.Center
  label.text = 'Press Spacebar to start!'
  return label
}

export default class TitleScene extends ex.Scene {
  onActivate(a, b) {
    super.onActivate(a, b)

    center = {
      x: globals.game.drawWidth / 2,
      y: globals.game.drawHeight / 2,
    }
    this.add(titleLabel())
    this.add(startLabel())
  }

  onDeactivate(a, b) {
    super.onDeactivate(a, b)

    const killActor = a => a.kill()
    this.actors.forEach(killActor)
  }

  onPreUpdate(game: Game) {
    const k = game.input.keyboard

    if (k.wasPressed(Keys.Space)) {
      game.changeScene('game')
    }
  }
}