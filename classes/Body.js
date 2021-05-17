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
    this.hide = config.hide
  }

  process () {
  }

  draw (ctx) {
    /* if an object is meant to be hidden, return to exit the method */
    if (this.hide === true) return

    /* if an object has a sprite, use the ctx.drawImage() method */
    if (this.sprite != undefined) {
      ctx.drawImage(
        this.sprite.source,
        this.position.x,
        this.position.y
      )
    }
    
    /* otherwise, use ctx.fillRect() and ctx.strokeRect() */
    else {
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
