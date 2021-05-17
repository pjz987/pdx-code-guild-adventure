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
      // console.log(this.aabbDetail(node, lastPosition))
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

  handleCollision (node, lastPosition) {
    const lastFrameAabb = this.aabbDetail(node, lastPosition)
    // console.log(lastFrameAabb, node)
    // console.log(this.position)
    if (lastFrameAabb.up === true) {
      console.log('up')
      this.position.y = node.position.y - node.dimensions.y - 0.001
    }
    if (lastFrameAabb.down === true) {
      console.log('down')
      this.position.y = node.position.y + node.dimensions.y + 0.001
    }
    if (lastFrameAabb.left === true) {
      console.log('left')
      this.position.x = node.position.x - node.dimensions.x - 0.001
    }
    if (lastFrameAabb.right === true) {
      console.log('right')
      console.log(this.position.x)
      this.position.x = node.position.x + node.dimensions.x + 0.001
      console.log(this.position.x)
    }
    // console.log(this.position)
    // console.log()
  }
}
