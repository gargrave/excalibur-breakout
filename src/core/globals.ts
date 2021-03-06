import * as ex from 'excalibur'

import { Game, Log } from '.'
import { isDev } from './utils'

type KeyedMap = {
  [key: string]: string
}

let collGroups: KeyedMap
let game: Game
let loggingEnabled: boolean = isDev()

export const globals = {
  get game() {
    return game
  },

  set game(_game: Game) {
    game = _game
  },

  get center() {
    return {
      x: game.drawWidth / 2,
      y: game.drawHeight / 2,
    }
  },

  set collGroups(_collGroups: KeyedMap) {
    const createCollGroup = cg => ex.CollisionGroupManager.create(cg)
    Object.values(_collGroups).forEach(createCollGroup)
    collGroups = _collGroups
  },

  get collGroups() {
    return collGroups
  },

  set loggingEnabled(val: boolean) {
    loggingEnabled = isDev() && val
    if (loggingEnabled) {
      Log.info('Logging has been enabled for dev env')
    } else {
      console.log('Logging disabled...')
    }
  },

  get loggingEnabled() {
    return loggingEnabled
  },
}
