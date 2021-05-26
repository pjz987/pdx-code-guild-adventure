/* globals KinematicBody */

class Player extends KinematicBody {
  constructor (config) {
    super(config)
    this.type = 'Player'
  }

  process (data) {
    /* data = { input, time} */
    this.checkCollisions(this.scene.nodes)
    this.move(data.input)
  }

  checkCollisions (bodies) {
    let changeColor = false
    bodies.forEach(body => {
      if (body === this) return
      if (this.aabbCollision(body)) changeColor = true
    })
    if (changeColor) this.color = '#F54B7E'
    else this.color = '#94D48C'
  }

  move (input) {
    if (input.w) this.position.y -= 6
    if (input.a) this.position.x -= 6
    if (input.s) this.position.y += 6
    if (input.d) this.position.x += 6
  }
}
