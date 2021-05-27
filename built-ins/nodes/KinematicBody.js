/* globals Body Vector2 */

/* Node > Body > KinematicBody */
class KinematicBody extends Body {
  constructor (config) {
    super(config)
    this.type = 'KinematicBody'
    this.velocity = new Vector2({
      x: config.velocityX || 0,
      y: config.velocityY || 0
    })
    this.detectCollision = config.detectCollision || true
  }

  checkCollisions (bodies = this.scene.nodes) {
    return bodies
      .filter(body => body !== this) // the body is not this KinematicBody
      .filter(body => this.aabbCollision(body)) // the body is colliding with this KinematicBody
  }

  /* Axis-Aligned Bounding Box Collision */
  aabbCollision (body) { // https://kishimotostudios.com/articles/aabb_collision/
    return !(
      this.position.x + this.dimensions.x < body.position.x || // this box is to the left of body
      this.position.x > body.position.x + body.dimensions.x || // this box is to the right of body
      this.position.y + this.dimensions.y < body.position.y || // this box is above body
      this.position.y > body.position.y + body.dimensions.y // this box is below body
    )
  }

  aabbDetail (body, position = this.position) {
    return {
      left: position.x + this.dimensions.x < body.position.x,
      right: position.x > body.position.x + body.dimensions.x,
      up: position.y + this.dimensions.y < body.position.y,
      down: position.y > body.position.y + body.dimensions.y
    }
  }

  defaultHandleCollision (node, lastPosition) {
    const lastFrameAabb = this.aabbDetail(node, lastPosition)
    if (lastFrameAabb.up === true) {
      this.velocity.y = 0
      this.position.y = node.position.y - this.dimensions.y - 0.001
    }
    if (lastFrameAabb.down === true) {
      this.velocity.y = 0
      this.position.y = node.position.y + node.dimensions.y + 0.001
    }
    if (lastFrameAabb.left === true) {
      this.velocity.x = 0
      this.position.x = node.position.x - this.dimensions.x - 0.001
    }
    if (lastFrameAabb.right === true) {
      this.velocity.x = 0
      this.position.x = node.position.x + node.dimensions.x + 0.001
    }
  }

  createTestBody (offset) {
    const testBody = new KinematicBody({
      x: offset.x
        ? this.position.x + offset.x
        : this.position.x,
      y: offset.y
        ? this.position.y + offset.y
        : this.position.y,
      width: this.dimensions.x,
      height: this.dimensions.y
    })
    return testBody
  }

  createTestBodyByDirection (direction) {
    const offset = {}
    if (direction === 'up') offset.y = -0.002
    if (direction === 'down') offset.y = 0.002
    if (direction === 'left') offset.x = -0.002
    if (direction === 'right') offset.x = 0.002
    return this.createTestBody(offset)
  }
}
