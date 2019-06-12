import * as ex from 'excalibur'

import { Game, Log } from '.'
import { isDev } from './utils'

export default class Scene extends ex.Scene {
  protected name: string

  constructor(game: Game, name: string) {
    super(game)

    this.name = name
  }

  onDeactivate(a, b) {
    super.onDeactivate(a, b)

    if (isDev()) {
      Log.event(`Exiting scene: ${this.name}`, [
        `Removing ${this.actors.length} Actors`,
      ])
    }

    const killActor = (a: ex.Actor) => {
      this.remove(a)
      a.kill()
    }
    this.actors.forEach(killActor)
  }
}
