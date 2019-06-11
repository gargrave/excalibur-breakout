import * as ex from 'excalibur'

import { globals } from './globals'

type ActorConfig = {
  x?: number
  y?: number
  width?: number
  height?: number
  color?: ex.Color
}

export default class Entity extends ex.Actor {
  constructor({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    color = ex.Color.White,
  }: ActorConfig = {}) {
    super(x, y, width, height, color)
  }

  update(engine, dt) {
    if (globals.game.paused) {
      return
    }
    super.update(engine, dt)
  }

  setCollisionGroup(group: string) {
    this.body.collider.group = ex.CollisionGroupManager.groupByName(group)
  }

  get left() {
    return this.body.collider.bounds.left
  }

  get right() {
    return this.body.collider.bounds.right
  }
}
