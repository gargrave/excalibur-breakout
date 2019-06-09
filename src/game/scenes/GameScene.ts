import * as ex from 'excalibur'

import { Game, globals } from '../../core'

import Ball from '../entities/Ball'
import Bricks from '../entities/Bricks'
import Player from '../entities/Player'

const Keys = ex.Input.Keys

export default class GameScene extends ex.Scene {
  constructor(game: Game) {
    super(game)
  }

  onActivate(prev, next) {
    super.onActivate(prev, next)

    const ball = new Ball()
    const bricks = new Bricks()
    const player = new Player()
    const entities = [ball, bricks, player]

    bricks.init(globals.game, this)

    for (const e of entities) {
      this.add(e)
    }

    // TODO: add a field to Entity to conditionally expose this
    if (process.env.NODE_ENV === 'development') {
      console.info('Adding entities to window for development mode!')
      const w = window as any
      w.ball = ball
      w.bricks = bricks
      w.player = player
    }
  }

  onDeactivate(prev, next) {
    super.onDeactivate(prev, next)

    // TODO: move this behavior to a base class
    for (const a of this.actors) {
      this.remove(a)
    }

    if (process.env.NODE_ENV === 'development') {
      console.info('Clearing entities from window !')
      const w = window as any
      delete w.ball
      delete w.bricks
      delete w.player
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
