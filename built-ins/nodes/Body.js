/* globals Node Vector2 */

/* Node > Body */
class Body extends Node {
  constructor (config) {
    super(config)
    this.type = 'Body'
    // this.position = new Vector2({
    //   x: config.x || 0,
    //   y: config.y || 0
    // })
    this.dimensions = new Vector2({
      x: config.width || 100,
      y: config.height || 100
    })
    this.color = config.color || 'grey'
    this.hide = config.hide || false
    this.collideWith = config.collideWith
    this.collideable = true
  }

  process () {
  }

  draw (ctx) {
    /* if an object is meant to be hidden, return to exit the method */
    if (this.hide === true) return

    /* if an object has a sprite, use the ctx.drawImage() method */
    if (this.sprite !== undefined) {
      if (this.sprite.type === 'AnimatedSprite') {
        ctx.drawImage(
          this.sprite.source,
          this.sprite.frameWidth * this.sprite.currentFrame,
          0,
          this.sprite.frameWidth,
          this.sprite.source.height,
          this.position.x,
          this.position.y,
          this.sprite.frameWidth,
          this.sprite.source.height
        )
      } else {
        ctx.drawImage(
          this.sprite.source,
          this.position.x,
          this.position.y
        )
      }
    } else {
      /* otherwise, use ctx.fillRect() and ctx.strokeRect() */
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
