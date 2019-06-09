import { GameConfig } from 'core/globals'

import GameScene from '../scenes/GameScene'
import TitleScene from '../scenes/TitleScene'

export const config: GameConfig = {
  collisionGroups: {
    ball: 'ball',
    bricks: 'bricks',
    player: 'player',
  },
  entryScene: 'game',
  scenes: {
    game: GameScene,
    title: TitleScene,
  },
}
