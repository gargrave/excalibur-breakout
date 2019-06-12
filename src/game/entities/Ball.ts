import * as ex from 'excalibur'

import { Entity, Score, globals } from '@core'
import { clamp } from '@core/utils'

const SIZE = 24
const BASE_SPEED = 160
const COLLISIONS_SPEED_INC = 10

const getStartX = () => {
  const min = 100
  const max = globals.game.drawWidth - 100
  const rand = Math.floor(Math.random() * globals.game.drawWidth)
  return clamp(min, max)(rand)
}

export default class Ball extends Entity {
  private currentSpeed = BASE_SPEED
  private collisions = 0

  constructor() {
    super({
      color: ex.Color.Red,
      height: SIZE,
      width: SIZE,
    })

    const x = getStartX()
    const midX = globals.game.halfDrawWidth
    const spd = this.currentSpeed
    this.pos.setTo(x, 250)
    this.vel.setTo(x > midX ? -spd : spd, spd)

    this.body.collider.type = ex.CollisionType.Passive
    this.collisionGroup = globals.collGroups.ball

    this.on('precollision', this.onPreCollision)
    this.on('exitviewport', this.onExitViewPort)
  }

  draw(ctx: CanvasRenderingContext2D, dt: number) {
    const { color, pos } = this

    ctx.fillStyle = color.toString()
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, SIZE / 2, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  onPostUpdate() {
    const { pos, vel } = this
    const half = SIZE / 2

    if (pos.x < half) {
      vel.x *= -1
    } else if (pos.x + half > globals.game.drawWidth) {
      vel.x *= -1
    }

    if (pos.y < half) {
      vel.y *= -1
    }
  }

  onPreCollision(e: ex.Events.PreCollisionEvent) {
    const { name } = e.other.body.collider.group
    if (name === globals.collGroups.bricks) {
      this.handleBrickCollision(e.other)
    }

    const intersection = e.intersection.normalize()
    if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
      this.vel.x *= -1
    } else {
      this.vel.y *= -1
    }
  }

  onExitViewPort() {
    if (this.isKilled()) {
      return
    }
    this.vel.setTo(0, 0)
    console.warn('TODO: Handle lose conditions')
  }

  handleBrickCollision(brick: ex.Actor) {
    // TODO: build a more robust way of handling scoring
    brick.kill()
    this.incrementSpeed()
    Score.add(100)
  }

  incrementSpeed() {
    this.collisions += 1
    this.currentSpeed = BASE_SPEED + this.collisions * COLLISIONS_SPEED_INC
    this.vel.setTo(
      this.currentSpeed * Math.sign(this.vel.x),
      this.currentSpeed * Math.sign(this.vel.y),
    )
  }
}
