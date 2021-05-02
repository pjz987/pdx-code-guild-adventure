/* globals config Body */

class KinematicBody extends Body {
  constructor (config) {
    super(config)
    this.vX = config.vX || 0
    this.vY = config.vY || 0
  }

  process (bodies) {
    this.move(bodies)
  }

  checkCollisions (bodies) {
    bodies.forEach(body => {
      if (body === this) {
        // console.log(false)
        return false
      }
      return !( // this needs to be fixed!
        body.x < this.x ||
        body.y < this.y ||
        body.x + body.w > this.x + this.w ||
        body.y + body.h > this.y + this.h
      )
    })
  }

  move (bodies) {
    console.log(this.checkCollisions(bodies))
    if (this.checkCollisions(bodies) === false) {
      console.log('here')
      this.vY += config.gravity
      this.x += this.vX
      this.y += this.vY
    } else this.vY = 0
  }
}
