import * as ex from 'excalibur'

import { initCollisionGroups } from './cg'
initCollisionGroups()

import Ball from './ball'
import Bricks from './bricks'
import Player from './player'

const game: ex.Engine = new ex.Engine({
  width: 800,
  height: 600,
})

const ball = new Ball()
const player = new Player()
const bricks = new Bricks()
bricks.init(game)
;(window as any).player = player

game.add(ball)
game.add(player)
game.add(bricks)
game.start()
