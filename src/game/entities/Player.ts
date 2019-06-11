import * as ex from 'excalibur'

import { Entity, globals } from '../../core'

const Keys = ex.Input.Keys

const DEFAULT_SPEED = 450

export default class Player extends Entity {
  private _speed: number = DEFAULT_SPEED

  constructor() {
    super()

    this.color = ex.Color.Chartreuse
    this.pos.setTo(320, 600 - 40)
    this.width = 176
    this.height = 32
    this.body.collider.type = ex.CollisionType.Fixed
    this.setCollisionGroup(globals.collGroups.player)
  }

  update(game: ex.Engine, dt: number) {
    if (globals.game.paused) {
      return
    }
    super.update(game, dt)

    const k = game.input.keyboard
    const vel = { x: 0 }

    if (k.isHeld(Keys.A) || k.isHeld(Keys.Left)) {
      vel.x -= 1
    }
    if (k.isHeld(Keys.D) || k.isHeld(Keys.Right)) {
      vel.x += 1
    }
    this.vel.setTo(vel.x * this.speed, 0)
  }

  onPostUpdate(game: ex.Engine, dt: number) {
    if (this.right < 0) {
      this.pos.setTo(game.drawWidth + this.width * 0.5 - 1, this.pos.y)
    } else if (this.left > game.drawWidth) {
      this.pos.setTo(this.width * -0.5 + 1, this.pos.y)
    }
  }

  get speed() {
    return this._speed
  }

  set speed(speed: number) {
    this._speed = speed
  }
}
