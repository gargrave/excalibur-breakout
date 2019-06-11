import * as ex from 'excalibur'

import { Entity, Game, globals } from '../../core'

const padding = 20
const xoffset = 65
const yoffset = 20
const rows = 3
const cols = 5

const brickColor = [ex.Color.Red, ex.Color.Orange, ex.Color.Yellow]
const brickHeight = 30

class Brick extends Entity {
  constructor(x, y, width, height, color) {
    super({ x, y, width, height, color })

    this.body.collider.type = ex.CollisionType.Active
    this.collisionGroup = globals.collGroups.bricks
  }
}

export default class Bricks extends Entity {
  init(game: Game, scene: ex.Scene) {
    const brickWidth = game.drawWidth / cols - padding - padding / cols
    const bricks: ex.Actor[] = []

    for (let j = 0; j < rows; j += 1) {
      for (let i = 0; i < cols; i += 1) {
        bricks.push(
          new Brick(
            xoffset + i * (brickWidth + padding) + padding,
            yoffset + j * (brickHeight + padding) + padding,
            brickWidth,
            brickHeight,
            brickColor[j % brickColor.length],
          ),
        )
      }
    }

    bricks.forEach(brick => {
      scene.add(brick)
    })
  }
}
