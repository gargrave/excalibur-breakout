import * as ex from 'excalibur'

import { Game } from 'core'

import Ball from '../entities/Ball'
import Bricks from '../entities/Bricks'
import Player from '../entities/Player'

export default class GameScene extends ex.Scene {
  constructor(game: Game) {
    super(game)

    const ball = new Ball()
    const player = new Player()
    const bricks = new Bricks()

    bricks.init(game, this)

    if (process.env.NODE_ENV === 'development') {
      console.log('Adding entities to window for development mode!')
      const w = window as any
      w.ball = ball
      w.bricks = bricks
      w.player = player
    }

    this.add(ball)
    this.add(player)
    this.add(bricks)
  }
}
