/* globals KinematicBody */

class Player extends KinematicBody {
  constructor (config) {
    super(config)
  }

  process (state) {
    this.move()
    const collisions = this.checkCollisions(state.nodes)
    collisions.forEach(collision => {

    })
  }

  move () {

  }
}
