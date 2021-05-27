/* globals KinematicBody Vector2 */

class Player extends KinematicBody {
  constructor (config) {
    super(config)
    this.gravity = 1
    this.acceleration = 1
    this.maxSpeed = 5
    this.jumpForce = 22.5
  }

  process (data) {
    const lastPosition = new Vector2({
      x: this.position.x,
      y: this.position.y
    })
    this.applyHorizontalInput(data.input, data.nodes, lastPosition)
    this.jumpCheck(data.input, data.nodes)
    this.applyGravity()
    this.move()
    const collidingNodes = this.checkCollisions(data.nodes)
    collidingNodes.forEach(node => {
      // if (data.input.s === true) console.log(node)
      this.defaultHandleCollision(node, lastPosition)
    })
  }

  move () {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  applyHorizontalInput (input) {
    /* check if the user is trying to move left or right */
    if (input.a === true || input.left === true) {
      this.velocity.x -= this.acceleration
      if (this.velocity.x < -this.maxSpeed) {
        this.velocity.x = -this.maxSpeed
      }
    } else if (input.d === true || input.right === true) {
      this.velocity.x += this.acceleration
      if (this.velocity.x > this.maxSpeed) {
        this.velocity.x = this.maxSpeed
      }
    } else { /* if not, slow down the player */
      if (this.velocity.x < 0) {
        this.velocity.x += this.acceleration
        if (this.velocity.x > 0) this.velocity.x = 0
      } else if (this.velocity.x > 0) {
        this.velocity.x -= this.acceleration
        if (this.velocity < 0) this.velocity.x = 0
      }
    }
  }

  jumpCheck (input, bodies) {
    /* jumping */
    if (input.space === true || input.w === true) {
      const testBody = this.createTestBodyByDirection('down')
      const testCollidingBodies = testBody.checkCollisions(bodies)
        .filter(body => body !== this)
      // testCollidingBodies.forEach(body => {
      //   if (testBody.aabbDetail(body).right === true) this.jump()
      // })
      if (testCollidingBodies.length > 0) this.jump()
    }
  }

  applyGravity () {
    this.velocity.y += this.gravity
  }

  jump () {
    this.velocity.y = -this.jumpForce
  }
}
