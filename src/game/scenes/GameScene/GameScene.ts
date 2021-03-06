import * as ex from 'excalibur'

import { Game, Log, Scene, globals, Score } from '@core'

import Ball from '../../entities/Ball'
import Bricks from '../../entities/Bricks'
import Player from '../../entities/Player'

import { pauseUI, scoreUI } from './GameScene.ui'

const Keys = ex.Input.Keys

export default class GameScene extends Scene {
  private scoreUI
  private pauseUI

  constructor(game: Game) {
    super(game, 'Game Scene')

    this.scoreUI = scoreUI()
    this.pauseUI = pauseUI()
  }

  onActivate(prev, next) {
    super.onActivate(prev, next)

    Score.reset()

    const ball = new Ball()
    const bricks = new Bricks()
    const player = new Player()
    const entities = [ball, bricks, player]

    bricks.init(globals.game, this)

    // TODO: add a log showing actors added (i.e. total count)
    for (const e of entities) {
      this.add(e)
    }

    // TODO: add a field to Entity to conditionally expose this
    if (process.env.NODE_ENV === 'development') {
      Log.info('Adding scene entities to window for development mode!')
      const w = window as any
      w.ball = ball
      w.bricks = bricks
      w.player = player
    }
  }

  onDeactivate(prev, next) {
    super.onDeactivate(prev, next)

    if (process.env.NODE_ENV === 'development') {
      Log.info('Removing scene entities from window object')
      const w = window as any
      delete w.ball
      delete w.bricks
      delete w.player
    }
  }

  draw(ctx: CanvasRenderingContext2D, dt: number) {
    super.draw(ctx, dt)

    this.scoreUI(ctx, dt)
    if (globals.game.paused) {
      this.pauseUI(ctx, dt)
    }
  }

  onPreUpdate(game: Game) {
    const k = game.input.keyboard

    if (k.wasPressed(Keys.Space) && game.paused) {
      game.changeScene('title')
      return
    }

    if (k.wasPressed(Keys.Esc)) {
      game.togglePause()
    }
  }
}
