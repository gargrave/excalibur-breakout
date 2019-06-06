import * as ex from 'excalibur'

const game: ex.Engine = new ex.Engine({
  width: 800,
  height: 600,
})

//=============================================
// Setup Player
//=============================================
const paddle = new ex.Actor(150, game.drawHeight - 40, 200, 20)
paddle.color = ex.Color.Chartreuse
paddle.collisionType = ex.CollisionType.Fixed
game.add(paddle)

game.input.pointers.primary.on('move', (e: any) => {
  paddle.pos.x = e.worldPos.x
})

//=============================================
// Setup Ball
//=============================================
const ball = new ex.Actor(100, 300, 20, 20)
ball.color = ex.Color.Red
ball.vel.setTo(100, 100)
ball.collisionType = ex.CollisionType.Passive

ball.on('precollision', (e: any) => {
  if (bricks.indexOf(e.other) > -1) {
    e.other.kill()
  }

  const intersection = e.intersection.normalize()
  if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
    ball.vel.x *= -1
  } else {
    ball.vel.y *= -1
  }
})
game.add(ball)

ball.on('postupdate', function() {
  if (this.pos.x < this.getWidth() / 2) {
    this.vel.x *= -1
  }
  if (this.pos.x + this.getWidth() / 2 > game.drawWidth) {
    this.vel.x *= -1
  }
  if (this.pos.y < this.getHeight() / 2) {
    this.vel.y *= -1
  }
})

ball.draw = function(ctx, delta) {
  ctx.fillStyle = this.color.toString()
  ctx.beginPath()
  ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
}

//=============================================
// Setup Bricks
//=============================================
const padding = 20
const xoffset = 65
const yoffset = 20
const columns = 5
const rows = 3

const brickColor = [ex.Color.Violet, ex.Color.Orange, ex.Color.Yellow]
const brickWidth = game.drawWidth / columns - padding - padding / columns
const brickHeight = 30
const bricks: ex.Actor[] = []

for (let j = 0; j < rows; j += 1) {
  for (let i = 0; i < columns; i += 1) {
    bricks.push(
      new ex.Actor(
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
  brick.collisionType = ex.CollisionType.Active
  game.add(brick)
})

ball.on('exitviewport', () => {
  alert('You lose!')
})

game.start()
