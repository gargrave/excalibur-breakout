import * as ex from 'excalibur'

import { globals, GameConfig } from './globals'
import { GameOptions } from './types'
import { isDev } from './utils'

import Log from './Log'

export default class Game extends ex.Engine {
  private _paused: boolean
  private options: GameOptions

  constructor(engineOptions: ex.EngineOptions, config: GameConfig) {
    super(engineOptions)

    globals.game = this

    this._paused = false
    this.options = config.options || {}

    window.addEventListener('blur', this.onWindowBlur)

    if (isDev()) {
      Log.info('Adding `globals` to window for dev env')
      const w = window as any
      w.globals = globals
    }
  }

  changeScene(nextScene: string) {
    this.goToScene(nextScene)
    this._paused = false
  }

  pause() {
    this._paused = true
  }

  togglePause() {
    this._paused = !this._paused
  }

  get paused() {
    return this._paused
  }

  onWindowBlur = () => {
    if (this.options.pauseOnBlur) {
      this.pause()
    }
  }
}
