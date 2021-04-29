class Body {
  constructor (x, y, w, h, color) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = color
  }

  draw (ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.w, this.h)
    ctx.strokeRect(this.x, this.y, this.w, this.h)
  }
}
