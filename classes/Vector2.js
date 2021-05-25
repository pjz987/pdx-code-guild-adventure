class Vector2 {
  constructor (config) {
    this.x = config.x ? config.x : 0
    // this.x = config.x // ? config.x : 0
    this.y = config.y ? config.y : 0
    // this.y = config.y // ? config.y : 0
    this.type = 'Vector2'
  }

  minus (vector2) {
    return new Vector2({
      x: this.x - vector2.x,
      y: this.y - vector2.y
    })
  }

  plus (vector2) {
    return new Vector2({
      x: this.x + vector2.x,
      y: this.y + vector2.y
    })
  }

  normalize () {
    // coming soon
  }
}
