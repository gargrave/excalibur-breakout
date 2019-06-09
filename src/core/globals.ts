import * as ex from 'excalibur'

import Game from './Game'

type KeyedMap = {
  [key: string]: string
}

export type GameConfig = {
  collisionGroups: {
    [key: string]: string
  }
  entryScene: string
  scenes: {
    [key: string]: any
  }
}

let collGroups: KeyedMap
let game: Game

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
}
