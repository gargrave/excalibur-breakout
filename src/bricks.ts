import * as ex from 'excalibur'

import { CollGroups } from './cg'

const padding = 20
const xoffset = 65
const yoffset = 20
const rows = 3
const cols = 5

const brickColor = [ex.Color.Violet, ex.Color.Orange, ex.Color.Yellow]
const brickHeight = 30

class Brick extends ex.Actor {
  constructor(x, y, w, h, color) {
    super(x, y, w, h, color)
    this.body.collider.type = ex.CollisionType.Active
    this.body.collider.group = ex.CollisionGroupManager.groupByName(
      CollGroups.bricks,
    )
  }
}

export default class Bricks extends ex.Actor {
  init(game: ex.Engine) {
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
      game.add(brick)
    })
  }
}
