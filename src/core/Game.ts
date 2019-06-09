import * as ex from 'excalibur'

import { globals } from './globals'

export default class Game extends ex.Engine {
  private _paused: boolean

  constructor(options: ex.EngineOptions) {
    super(options)

    globals.game = this

    this._paused = false
  }

  changeScene(nextScene: string) {
    this.goToScene(nextScene)
    this._paused = false
  }

  togglePause() {
    this._paused = !this._paused
  }

  get paused() {
    return this._paused
  }
}
