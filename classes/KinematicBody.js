/* globals config Body */

class KinematicBody extends Body {
  constructor (config) {
    super(config)
    this.type = 'KinematicBody'
    this.vX = config.vX || 0
    this.vY = config.vY || 0
  }

  process (bodies, input) {
    // this.checkCollisions(bodies)
    // this.move(input)
  }

  // checkCollisions (bodies) {
  //   let changeColor = false
  //   bodies.forEach(body => {
  //     if (body === this) return
  //     if (this.aabbCollision(body)) changeColor = true
  //   })
  //   if (changeColor) this.color = 'red'
  //   else this.color = 'green'
  // }

  /* Axis-Aligned Bounding Box Collision */
  aabbCollision (body) { // https://kishimotostudios.com/articles/aabb_collision/
    return !(
      this.position.x + this.dimensions.x < body.position.x || // this is to the left of body
      this.position.x > body.position.x + body.dimensions.x || // this is to the right of body
      this.position.y + this.dimensions.y < body.position.y || // this is above body
      this.position.y > body.position.y + body.dimensions.y // this is below body
    )
  }

  // move (input) {
  //   if (input.w) this.position.y -= 6
  //   if (input.a) this.position.x -= 6
  //   if (input.s) this.position.y += 6
  //   if (input.d) this.position.x += 6
  //   if (input.space) console.log('jump')
  // }
}
