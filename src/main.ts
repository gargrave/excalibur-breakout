import config from './config'

import { globals } from './core'

import Breakout from './game/Breakout'
import GameScene from './game/scenes/GameScene'

const game = new Breakout()
globals.collGroups = config.collisionGroups

game.add('gameScene', new GameScene(game))
game.goToScene('gameScene')

game.start()
