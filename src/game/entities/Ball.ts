import * as ex from 'excalibur'

import { Entity, globals } from '../../core'

const size = 24
const speed = 160

export default class Ball extends Entity {
  constructor() {
    super()

    this.color = ex.Color.Red
    this.height = size
    this.width = size
    this.pos.setTo(100, 300)
    this.vel.setTo(speed, speed)

    this.body.collider.type = ex.CollisionType.Passive
    this.collisionGroup = globals.collGroups.ball

    this.on('precollision', this.handlePreCollision)
    this.on('exitviewport', this.handleExitViewPort)
  }

  draw(ctx: CanvasRenderingContext2D, dt: number) {
    const { color, pos } = this

    ctx.fillStyle = color.toString()
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, size / 2, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  onPostUpdate() {
    const { pos, vel } = this
    const half = size / 2

    if (pos.x < half) {
      vel.x *= -1
    } else if (pos.x + half > globals.game.drawWidth) {
      vel.x *= -1
    }

    if (pos.y < half) {
      vel.y *= -1
    }
  }

  handlePreCollision(e: ex.Events.PreCollisionEvent) {
    const { name } = e.other.body.collider.group
    if (name === globals.collGroups.bricks) {
      e.other.kill()
    }

    const intersection = e.intersection.normalize()
    if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
      this.vel.x *= -1
    } else {
      this.vel.y *= -1
    }
  }

  handleExitViewPort() {
    if (this.isKilled()) {
      return
    }
    this.vel.setTo(0, 0)
    console.warn('TODO: Handle lose conditions')
  }
}
