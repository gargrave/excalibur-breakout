import * as ex from 'excalibur'

import { CollGroups } from './cg'

const Keys = ex.Input.Keys
const DEFAULT_SPEED = 25

export default class Player extends ex.Actor {
  constructor(private _speed = DEFAULT_SPEED) {
    super()
    this.color = ex.Color.Chartreuse
    this.pos.setTo(320, 600 - 40)
    this.width = 176
    this.height = 24
    this.body.collider.type = ex.CollisionType.Fixed
    this.body.collider.group = ex.CollisionGroupManager.groupByName(
      CollGroups.player,
    )
  }

  update(engine: ex.Engine, dt: number) {
    const k = engine.input.keyboard
    const vel = { x: 0 }

    if (k.isHeld(Keys.A) || k.isHeld(Keys.Left)) {
      vel.x -= 1
    }
    if (k.isHeld(Keys.D) || k.isHeld(Keys.Right)) {
      vel.x += 1
    }
    this.vel.setTo(vel.x * this.speed * dt, 0)

    super.update(engine, dt)
  }

  get speed() {
    return this._speed
  }

  set speed(speed: number) {
    this._speed = speed
  }
}
