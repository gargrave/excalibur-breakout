import * as ex from 'excalibur'

import config from './config'

import { Game, globals } from './core'

import GameScene from './game/scenes/GameScene'

const game = new Game({
  width: 800,
  height: 600,
})
globals.collGroups = config.collisionGroups
game.backgroundColor = ex.Color.fromHex('#454545')

game.add('gameScene', new GameScene(game))
game.goToScene('gameScene')

game.start()
