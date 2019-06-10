import * as ex from 'excalibur'
import { LabelArgs } from 'excalibur/dist/Label'

import { globals } from '../../../core'

const defaultConfig: LabelArgs = {
  color: ex.Color.fromHex('#f5f56f'),
  fontFamily: 'Sans-Serif',
  fontUnit: ex.FontUnit.Px,
  textAlign: ex.TextAlign.Center,
  visible: false,
}

const labels = () => {
  const w = globals.game.drawWidth
  const h = globals.game.drawHeight

  const pausedLabel = new ex.Label({
    ...defaultConfig,
    fontSize: 48,
    text: 'Paused!',
  })
  pausedLabel.pos.setTo(w / 2, h / 2)

  const unpauseLabel = new ex.Label({
    ...defaultConfig,
    color: ex.Color.White,
    text: 'Press ESC to continue.',
  })
  unpauseLabel.fontSize = 28
  unpauseLabel.pos.setTo(w / 2, pausedLabel.y + pausedLabel.fontSize)

  const quitLabel = new ex.Label({
    ...defaultConfig,
    color: ex.Color.White,
    fontSize: 20,
    text: 'Or press Spacebar to quit.',
  })
  quitLabel.pos.setTo(w / 2, h - quitLabel.fontSize)

  return {
    paused: pausedLabel,
    unpause: unpauseLabel,
    quit: quitLabel,
  }
}

export default labels
