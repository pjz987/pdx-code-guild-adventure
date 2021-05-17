/* globals config Body */

class KinematicBody extends Body {
  constructor (config) {
    super(config)
    this.type = 'KinematicBody'
    this.vX = config.vX || 0
    this.vY = config.vY || 0
    this.detectCollision = config.detectCollision || false
  }

  process () {
  }

  checkCollisions (bodies) {
    return bodies
      .filter(body => body != this) // the body is not this KinematicBody
      .filter(body => this.aabbCollision(body)) // the body is colliding with this KinematicBody
  }

  /* Axis-Aligned Bounding Box Collision */
  aabbCollision (body) { // https://kishimotostudios.com/articles/aabb_collision/
    return !(
      this.position.x + this.dimensions.x < body.position.x || // this is to the left of body
      this.position.x > body.position.x + body.dimensions.x || // this is to the right of body
      this.position.y + this.dimensions.y < body.position.y || // this is above body
      this.position.y > body.position.y + body.dimensions.y // this is below body
    )
  }

  aabbDetail (body, position=this.position) {
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
      this.position.y = node.position.y - node.dimensions.y - 0.001
    }
    if (lastFrameAabb.down === true) {
      this.position.y = node.position.y + node.dimensions.y + 0.001
    }
    if (lastFrameAabb.left === true) {
      this.position.x = node.position.x - node.dimensions.x - 0.001
    }
    if (lastFrameAabb.right === true) {
      this.position.x = node.position.x + node.dimensions.x + 0.001
    }
  }
}
