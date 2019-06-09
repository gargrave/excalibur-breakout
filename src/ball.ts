import * as ex from 'excalibur'

import { CollGroups } from './cg'

// TODO: expose game globally
const GAME_WIDTH = 800
const size = 20

export default class Ball extends ex.Actor {
  constructor() {
    super()
    this.color = ex.Color.Red
    this.height = size
    this.width = size
    this.pos.setTo(100, 300)
    this.vel.setTo(125, 125)

    this.body.collider.type = ex.CollisionType.Passive
    this.body.collider.group = ex.CollisionGroupManager.groupByName(
      CollGroups.ball,
    )

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
    } else if (pos.x + half > GAME_WIDTH) {
      vel.x *= -1
    }

    if (pos.y < half) {
      vel.y *= -1
    }
  }

  handlePreCollision(e: ex.Events.PreCollisionEvent) {
    const { name } = e.other.body.collider.group
    if (name === CollGroups.bricks) {
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
    alert('you lose!')
  }
}
