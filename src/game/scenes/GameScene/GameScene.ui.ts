import * as ex from 'excalibur'
import { LabelArgs } from 'excalibur/dist/Label'

import { Score, globals } from '../../../core'

const defaultConfig: LabelArgs = {
  color: ex.Color.White,
  fontFamily: 'Sans-Serif',
  fontUnit: ex.FontUnit.Px,
  textAlign: ex.TextAlign.Center,
  visible: false,
}

export const scoreUI = () => {
  let prevScore = 0

  const scoreLabelConfig = {
    ...defaultConfig,
    fontSize: 32,
    textAlign: ex.TextAlign.Left,
  }

  // TODO: make a custom Label class with an "outline" option
  const scoreLabel = new ex.Label({
    ...scoreLabelConfig,
    pos: new ex.Vector(14, 42),
    text: 'Score:',
  })

  const scoreValue = new ex.Label({
    ...scoreLabelConfig,
    text: '0',
  })

  const updateScoreText = () => {
    const score = Score.getCurrent()
    if (score !== prevScore) {
      scoreValue.text = `${score}`
    }
    prevScore = score
  }

  return (ctx: CanvasRenderingContext2D, dt: number) => {
    if (!scoreValue.pos.x) {
      const scoreLabelRight = scoreLabel.pos.x + scoreLabel.getTextWidth(ctx)
      const scoreOffset = 6
      const x = scoreLabelRight + scoreOffset
      scoreValue.pos.setTo(x, 42)
    }

    updateScoreText()
    scoreLabel.draw(ctx, dt)
    scoreValue.draw(ctx, dt)
  }
}

export const pauseUI = () => {
  const w = globals.game.drawWidth
  const h = globals.game.drawHeight

  const pausedLabel = new ex.Label({
    ...defaultConfig,
    color: ex.Color.fromHex('#f5f56f'),
    fontSize: 48,
    pos: new ex.Vector(w / 2, h / 2),
    text: 'Paused!',
  })

  const unpauseLabel = new ex.Label({
    ...defaultConfig,
    fontSize: 24,
    pos: new ex.Vector(w / 2, pausedLabel.y + pausedLabel.fontSize),
    text: 'Press ESC to continue.',
  })

  const quitFontSize = 20
  const quitLabel = new ex.Label({
    ...defaultConfig,
    fontSize: quitFontSize,
    pos: new ex.Vector(w / 2, h - quitFontSize),
    text: 'Or press Spacebar to quit.',
  })

  return (ctx: CanvasRenderingContext2D, dt: number) => {
    // draw the overlay
    ctx.fillStyle = 'rgba(0, 0, 0, .85)'
    ctx.rect(0, 0, w, h)
    ctx.fill()

    pausedLabel.draw(ctx, dt)
    unpauseLabel.draw(ctx, dt)
    quitLabel.draw(ctx, dt)
  }
}
