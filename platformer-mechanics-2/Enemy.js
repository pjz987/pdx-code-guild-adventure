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
    // this.raycastLeftDown = new FakeRaycast({ // left collide check
    //   parent: this,
    //   x: -5,
    //   y: this.dimensions.y + 5,
    //   name: 'raycastLeftDown'
    // })
    // this.raycastRightDown = new FakeRaycast({
    //   parent: this,
    //   x: 5 + this.dimensions.x,
    //   y: this.dimensions.y + 5,
    //   name: 'raycastRightDown'
    // })
    this.fakeRaycasts = [
      this.raycastLeft,
      this.raycastRight
      // this.raycastLeftDown,
      // this.raycastRightDown
    ]
    this.facing = config.facing || 'left'
    // this.turnedAround = false
    this.type = 'Enemy'
  }

  process (_data) {
    // this.turnedAround = false
    const lastPosition = new Vector2({
      x: this.position.x,
      y: this.position.y
    })
    this.move()
    this.checkCollisions(this.scene.nodes)
      .forEach(node => {
        if (node.type !== 'Player') this.defaultHandleCollision(node, lastPosition)
      })
    this.checkRaycasts()
  }

  checkRaycasts () {
    this.fakeRaycasts.forEach(raycast => {
      raycast.updatePosition()
      raycast.checkCollision(this.scene.nodes, collision => {
        this.resolveRaycast(collision, raycast)
      })
    })
  }

  resolveRaycast (collision, raycast) {
    // collision = { node, collision: true/false, detail: object of collision detail by direction }
    // console.log(raycast.parent.id)
    // if (this.turnedAround === true) return
    if (collision.collision === true && collision.node.type !== 'Player') {
      if (this.facing === 'right' && raycast.name === 'raycastRight') this.facing = 'left'
      else if (this.facing === 'left' && raycast.name === 'raycastLeft') this.facing = 'right'
    }

    // if (collision.collision === true && this.facing === 'left') {
    //   if (raycast.name === 'raycastLeft') {
    //     this.facing = 'right'
    //     // this.turnedAround = true
    //   } else if (raycast.name === 'raycastRight' && this.facing === 'right') {
    //     this.facing = 'left'
    //     // this.turnedAround = true
    //   }
    // } else if (collision.collision === false) {
    //   if (raycast.name === 'raycastLeftDown' && this.facing === 'left') {
    //     this.facing = 'right'
    //     // this.turnedAround = true
    //   } else if (raycast.name === 'raycastRightDown' && this.facing === 'right') {
    //     this.facing = 'left'
    //     // this.turnedAround = true
    //   }
    // }
  }

  move () {
    if (this.facing === 'left') this.position.x -= 2.5
    else if (this.facing === 'right') this.position.x += 2.5
  }
}
