/* globals KinematicBody FakeRaycast Vector2 */

class Enemy extends KinematicBody {
  constructor (config) {
    super(config)
    this.name = 'Enemy'
    this.raycastLeft = new FakeRaycast({ // left collide check
      parent: this,
      x: -5,
      y: this.dimensions.y / 2,
      name: 'raycastLeft'
    })
    this.raycastRight = new FakeRaycast({
      parent: this,
      x: 5 + this.dimensions.x,
      y: this.dimensions.y / 2,
      name: 'raycastRight'
    })
    this.fakeRaycasts = [
      this.raycastLeft,
      this.raycastRight
    ]
    this.facing = 'left'
  }

  process (data) {
    if (data.input.w) console.log(this.fakeRaycasts)
    const lastPosition = new Vector2({
      x: this.position.x,
      y: this.position.y
    })
    this.move()
    this.checkCollisions(this.scene.nodes)
      .forEach(node => this.defaultHandleCollision(node, lastPosition))
    this.checkRaycasts()
  }

  checkRaycasts () {
    // console.log(this.scene)
    this.fakeRaycasts.forEach(raycast => {
      raycast.updatePosition()
      raycast.checkCollision(this.scene.nodes, collision => this.resolveRaycast(collision, raycast))
    })
  }

  resolveRaycast (collision, raycast) {
    if (collision.collision) {
      // console.log(this.fakeRaycasts)
      // console.log(collision)
      if (raycast.name === 'raycastLeft') this.facing = 'right'
      else if (raycast.name === 'raycastRight') this.facing = 'left'
    }
  }

  move () {
    if (this.facing === 'left') this.position.x -= 2.5
    else if (this.facing === 'right') this.position.x += 2.5
  }
}
