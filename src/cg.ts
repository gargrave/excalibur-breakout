import * as ex from 'excalibur'

export const CollGroups = {
  ball: 'ball',
  bricks: 'bricks',
  player: 'player',
}

export const initCollisionGroups = () => {
  Object.values(CollGroups).forEach(cg => ex.CollisionGroupManager.create(cg))
}
