/* globals KinematicBody */

class Player extends KinematicBody {
  constructor (config) {
    super(config)
  }

  process (data) {
    const lastPosition = new Vector2({
      x: this.position.x,
      y: this.position.y,
    })
    this.move(data.input)
    const collidingNodes = this.checkCollisions(data.nodes)
    collidingNodes.forEach(node => {
      this.defaultHandleCollision(node, lastPosition)
      // console.log(collision)
      // console.log(this.position.minus(collision.position))
    })
  }

  move (input) {
    if (input.w) this.position.y -= 5
    if (input.a) this.position.x -= 5
    if (input.s) this.position.y += 5
    if (input.d) this.position.x += 5
  }

  // handleCollision (node, lastPosition) {
  //   const lastFrameAabb = this.aabbDetail(node, lastPosition)
  //   if (lastFrameAabb.up === true) {
  //     this.position.y = node.position.y - node.dimensions.y - 0.001
  //   }
  //   if (lastFrameAabb.down === true) {
  //     this.position.y = node.position.y + node.dimensions.y + 0.001
  //   }
  //   if (lastFrameAabb.left === true) {
  //     this.position.x = node.position.x - node.dimensions.x - 0.001
  //   }
  //   if (lastFrameAabb.right === true) {
  //     this.position.x = node.position.x + node.dimensions.x + 0.001
  //   }
  // }
}
