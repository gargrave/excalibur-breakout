import * as ex from 'excalibur'

const game = new ex.Engine({
  width: 800,
  height: 600,
})

const paddle = new ex.Actor(150, game.drawHeight - 40, 200, 20)
paddle.color = ex.Color.Chartreuse
paddle.collisionType = ex.CollisionType.Fixed
game.add(paddle)

game.start()
