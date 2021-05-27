/* globals KinematicBody Vector2 */

class Player extends KinematicBody {
  constructor (config) {
    super(config)
    this.gravity = 1
    this.acceleration = 1
    this.maxSpeed = 5
    this.jumpForce = 22.5
    this.type = 'Player'
  }

  process (data) {
    const lastPosition = new Vector2({
      x: this.position.x,
      y: this.position.y
    })
    this.applyHorizontalInput(data.input, data.nodes, lastPosition)
    this.jumpCheck(data.input, data.nodes, lastPosition)
    this.applyGravity()
    this.move()
    const collidingNodes = this.checkCollisions(data.nodes)
    collidingNodes.forEach(node => {
      if (node.collideWith !== undefined) return
      if (node.type === 'Enemy') this.handleEnemyCollision(node, lastPosition)
      else this.defaultHandleCollision(node, lastPosition)
    })
  }

  handleEnemyCollision (enemy, lastPosition) {
    const lastFrameAabb = this.aabbDetail(enemy, lastPosition)
    if (lastFrameAabb.up === true) this.kill(enemy)
    else this.die()
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
    } else if (input.d == true || input.right === true) {
      this.velocity.x += this.acceleration
      if (this.velocity.x > this.maxSpeed) {
        this.velocity.x = this.maxSpeed
      }
    }

    /* if not, slow down the player */
    else {
      if (this.velocity.x < 0) {
        this.velocity.x += this.acceleration
        if (this.velocity.x > 0) this.velocity.x = 0
      } else if (this.velocity.x > 0) {
        this.velocity.x -= this.acceleration
        if (this.velocity < 0) this.velocity.x = 0
      }
    }
  }

  jumpCheck (input, bodies, lastPosition) {
    /* jumping */
    if (input.space === true || input.w === true) {
      const testBody = this.createTestBodyByDirection('down')
      // console.log(testBody)
      const testCollidingBodies = testBody.checkCollisions(bodies).filter(body => body !== this).filter(body => body.collideWith === undefined)
      // console.log(testCollidingBodies)
      testCollidingBodies.forEach(body => {
        if (testBody.aabbDetail(body).down === false) this.jump()
      })
    }
  }

  jump (mult = 1) {
    this.velocity.y = -this.jumpForce * mult
  }

  applyGravity () {
    this.velocity.y += this.gravity
  }

  die () {
    const index = this.scene.nodes.indexOf(this)
    this.scene.nodes.splice(index, 1)
  }

  kill (enemy) {
    const index = this.scene.nodes.indexOf(enemy)
    this.scene.nodes.splice(index, 1)
    this.jump(0.75)
  }
}
