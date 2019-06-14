import * as ex from 'excalibur'

import MenuItem from './MenuItem'

export type MenuConfig = {
  nonSelectableItems: MenuItem[]
  selectableItems: MenuItem[]
}

export default class Menu extends ex.Actor {
  protected allItems: MenuItem[]
  protected nonSelectableItems: MenuItem[]
  protected selectableItems: MenuItem[]

  constructor(config: MenuConfig) {
    super()
    this.nonSelectableItems = config.nonSelectableItems
    this.selectableItems = config.selectableItems
    this.allItems = [...this.nonSelectableItems, ...this.selectableItems]

    this.allItems.forEach(i => this.add(i))
  }

  init() {
    this.allItems.forEach(i => i.init(this.allItems))
  }
}
