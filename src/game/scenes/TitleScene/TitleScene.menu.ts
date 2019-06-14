import * as ex from 'excalibur'
import { LabelArgs } from 'excalibur/dist/Label'

import { globals as g, Menu, MenuItem } from '@core'

const defaultConfig: Partial<LabelArgs> = {
  color: ex.Color.White,
  fontFamily: 'Sans-Serif',
  fontUnit: ex.FontUnit.Px,
  textAlign: ex.TextAlign.Center,
}

class TitleLabel extends MenuItem {
  constructor() {
    const labelArgs: LabelArgs = {
      ...defaultConfig,
      color: ex.Color.Yellow,
      fontSize: 72,
      pos: new ex.Vector(g.center.x, g.center.y),
      text: 'BREAKOUT',
    }
    super({
      labelArgs,
      name: 'title',
    })
  }
}

class StartLabel extends MenuItem {
  constructor() {
    const labelArgs: LabelArgs = {
      ...defaultConfig,
      fontSize: 32,
      pos: new ex.Vector(g.center.x, g.center.y),
      text: 'Press Spacebar to start!',
    }
    super({
      labelArgs,
      name: 'start',
    })
  }

  init(items: MenuItem[]) {
    const title = items.find(i => i.name === 'title')
    if (title) {
      this.pos.setTo(g.center.x, title.pos.y + title.fontSize)
    }
  }
}

export default class TitleMenu extends Menu {
  constructor() {
    super({
      nonSelectableItems: [new TitleLabel()],
      selectableItems: [new StartLabel()],
    })
  }
}
