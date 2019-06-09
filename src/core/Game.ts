import * as ex from 'excalibur'

const Keys = ex.Input.Keys

export default class Game extends ex.Engine {
  private _paused: boolean

  constructor(options: ex.EngineOptions) {
    super(options)

    this._paused = false
  }

  onPreUpdate(engine: ex.Engine) {
    const k = engine.input.keyboard
    if (k.wasPressed(Keys.Esc)) {
      this.togglePause()
    }
  }

  togglePause() {
    this._paused = !this._paused
  }

  get paused() {
    return this._paused
  }
}