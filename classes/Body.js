/* globals Node */

class Body extends Node {
  constructor (config) {
    super(config)
    this.type = 'Body'
    this.x = config.x || 0
    this.y = config.y || 0
    this.w = config.w || 100
    this.h = config.h || 100
    this.color = config.color || ''
  }

  process () {
  }

  draw (ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h)
    ctx.strokeRect(this.x, this.y, this.w, this.h)
  }
}
