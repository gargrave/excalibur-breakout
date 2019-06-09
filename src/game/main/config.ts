import { GameConfig } from 'core/globals'

import GameScene from '../scenes/GameScene'

export const config: GameConfig = {
  collisionGroups: {
    ball: 'ball',
    bricks: 'bricks',
    player: 'player',
  },
  entryScene: 'title',
  scenes: {
    game: GameScene,
  },
}
