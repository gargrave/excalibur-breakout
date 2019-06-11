import * as ex from 'excalibur'

import { config } from './config'

import { Game, globals } from '../../core'

export default class Breakout extends Game {
  constructor() {
    const engineOptions: ex.EngineOptions = {
      height: 600,
      width: 800,
    }
    super(engineOptions, config)

    globals.collGroups = config.collisionGroups

    this.backgroundColor = ex.Color.fromHex('#454545')

    this.setupScenes()
    this.changeScene(config.entryScene)
  }

  setupScenes() {
    const { scenes } = config
    Object.entries(scenes).forEach(([name, inst]) => {
      this.addScene(name, new inst(this))
    })
  }
}
