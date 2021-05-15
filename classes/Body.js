/* globals Node Vector2 */

class Body extends Node {
  constructor (config) {
    super(config)
    this.type = 'Body'
    this.position = new Vector2({
      x: config.x || 0,
      y: config.y || 0
    })
    this.dimensions = new Vector2({
      x: config.width || 100,
      y: config.height || 100
    })
    this.color = config.color || ''
  }

  process () {
  }

  draw (ctx) {
    if (this.sprite != undefined) {
      ctx.drawImage(
        this.sprite.source,
        this.position.x,
        this.position.y
      )
    } else {
      ctx.beginPath()
      ctx.fillStyle = this.color
      ctx.fillRect(
        this.position.x,
        this.position.y,
        this.dimensions.x,
        this.dimensions.y
      )
      ctx.strokeRect(
        this.position.x,
        this.position.y,
        this.dimensions.x,
        this.dimensions.y
      )
    }
  }
}
