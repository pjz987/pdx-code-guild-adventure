/* globals Vector2 */

class FakeRaycast {
  constructor (config) {
    this.parent = config.parent
    this.offset = new Vector2({
      x: config.x,
      y: config.y
    })
    this.position = this.offset.plus(this.parent.position)
    this.type = 'FakeRayCast'
    this.name = config.name
  }

  updatePosition () {
    this.position = this.offset.plus(this.parent.position)
  }

  checkCollision (nodes, resolver) {
    nodes.filter(node => node !== this.parent)
      .map(node => {
        return {
          node,
          collision: this.aabbCollision(node),
          detail: this.aabbDetail(node)
        }
      })
      .forEach(node => resolver(node))
  }

  /* Axis-Aligned Bounding Box Collision */
  aabbCollision (body) { // https://kishimotostudios.com/articles/aabb_collision/
    return !(
      this.position.x < body.position.x || // this point is to the left of body
      this.position.x > body.position.x + body.dimensions.x || // this point is to the right of body
      this.position.y < body.position.y || // this point is above body
      this.position.y > body.position.y + body.dimensions.y // this point is below body
    )
  }

  aabbDetail (body, position = this.position) {
    return {
      left: position.x < body.position.x,
      right: position.x > body.position.x + body.dimensions.x,
      up: position.y < body.position.y,
      down: position.y > body.position.y + body.dimensions.y
    }
  }
}
