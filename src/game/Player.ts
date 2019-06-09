import * as ex from 'excalibur'

import { Entity, globals } from '../core'

const Keys = ex.Input.Keys

// const DEFAULT_SPEED = 25
const DEFAULT_SPEED = 450

export default class Player extends Entity {
  _speed: number

  constructor() {
    super()

    this.color = ex.Color.Chartreuse
    this.pos.setTo(320, 600 - 40)
    this.width = 176
    this.height = 32
    this.body.collider.type = ex.CollisionType.Fixed
    this.setCollisionGroup(globals.collGroups.player)

    this._speed = DEFAULT_SPEED
  }

  update(engine: ex.Engine, dt: number) {
    if (this.game.paused) {
      return
    }
    super.update(engine, dt)

    const k = engine.input.keyboard
    const vel = { x: 0 }

    if (k.isHeld(Keys.A) || k.isHeld(Keys.Left)) {
      vel.x -= 1
    }
    if (k.isHeld(Keys.D) || k.isHeld(Keys.Right)) {
      vel.x += 1
    }
    // this.vel.setTo(vel.x * this.speed * dt, 0)
    this.vel.setTo(vel.x * this.speed, 0)
  }

  get speed() {
    return this._speed
  }

  set speed(speed: number) {
    this._speed = speed
  }
}
