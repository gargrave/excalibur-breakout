import * as ex from 'excalibur'

import { isDev } from './utils'
import { GameOptions } from './types'

import Game from './Game'
import Log from './Log'

type KeyedMap = {
  [key: string]: string
}

export type GameConfig = {
  collisionGroups: {
    [key: string]: string
  }
  entryScene: string
  options?: GameOptions
  scenes: {
    [key: string]: any
  }
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
