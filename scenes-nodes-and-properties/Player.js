/* globals KinematicBody */

class Player extends KinematicBody {
  constructor (config) {
    super(config)
    this.color = 'rosybrown'
    this.moving = 'right'
  }

  process () {
    if (this.moving === 'right') {
      this.position.x += 1.5
      if (this.position.x > this.scene.dimensions.x * (2 / 3)) this.moving = 'down'
    } else if (this.moving === 'down') {
      this.position.y += 1.5
      if (this.position.y > this.scene.dimensions.y * (2 / 3)) this.moving = 'left'
    } else if (this.moving === 'left') {
      this.position.x -= 1.5
      if (this.position.x < this.scene.dimensions.x * (1 / 3) - this.dimensions.x) this.moving = 'up'
    } else if (this.moving === 'up') {
      this.position.y -= 1.5
      if (this.position.y < this.scene.dimensions.y * (1 / 3) - this.dimensions.x) this.moving = 'right'
    }
  }
}
