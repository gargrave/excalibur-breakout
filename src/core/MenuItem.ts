import * as ex from 'excalibur'
import { LabelArgs } from 'excalibur/dist/Label'

export type MenuItemConfig = {
  labelArgs: LabelArgs
  name?: string
}

export default class MenuItem extends ex.Label {
  name: string

  constructor(config: MenuItemConfig) {
    super(config.labelArgs)
    this.name = config.name || ''
  }

  init(otherItems: MenuItem[] = []) {}
}
