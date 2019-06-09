import * as ex from 'excalibur'

import { globals } from './globals'
import Game from './Game'

export default class Entity extends ex.Actor {
  protected game: Game

  constructor(
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    color?: ex.Color,
  ) {
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
