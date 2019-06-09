import * as ex from 'excalibur'

import config from './config'

import { Game, globals } from './core'

import Ball from './game/Ball'
import Bricks from './game/Bricks'
import Player from './game/Player'

const game = new Game({
  width: 800,
  height: 600,
})
globals.game = game
globals.collGroups = config.collisionGroups
game.backgroundColor = ex.Color.fromHex('#454545')
// game.isDebug = true

const ball = new Ball()
const player = new Player()
const bricks = new Bricks()
bricks.init(game)
;(window as any).player = player

game.add(ball)
game.add(player)
game.add(bricks)
game.start()
