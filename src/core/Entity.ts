import * as ex from 'excalibur'

import { globals } from './globals'
import Game from './Game'

type ActorConfig = {
  x?: number
  y?: number
  width?: number
  height?: number
  color?: ex.Color
}

export default class Entity extends ex.Actor {
  protected game: Game

  constructor({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    color = ex.Color.White,
  }: ActorConfig = {}) {
    super(x, y, width, height, color)

    this.game = globals.game
  }

  update(engine, dt) {
    if (this.game.paused) {
      return
    }
    super.update(engine, dt)
  }

  setCollisionGroup(group: string) {
    this.body.collider.group = ex.CollisionGroupManager.groupByName(group)
  }
}
