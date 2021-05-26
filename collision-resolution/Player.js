/* globals KinematicBody Vector2 */

class Player extends KinematicBody {
  process (data) {
    /* data = { input, time } */
    const lastPosition = new Vector2({
      x: this.position.x,
      y: this.position.y
    })
    this.move(data.input)
    const collidingNodes = this.checkCollisions(this.scene.nodes)
    collidingNodes.forEach(node => {
      this.defaultHandleCollision(node, lastPosition)
    })
  }

  move (input) {
    if (input.w) this.position.y -= 5
    if (input.a) this.position.x -= 5
    if (input.s) this.position.y += 5
    if (input.d) this.position.x += 5
  }
}
