export type GameOptions = {
  pauseOnBlur?: boolean
}

export type GameConfig = {
  collisionGroups: {
    [key: string]: string
  }
  entryScene: string
  options?: GameOptions
  scenes: {
    [key: string]: any
  }
}
