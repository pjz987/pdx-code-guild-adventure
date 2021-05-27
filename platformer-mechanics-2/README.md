# Platformer Mechanics: Enemies

Now it's time to give our player some baddies to jump on.  We'll create an `Enemy` class, which extends `KinematicBody`.  It has a `move` method, called in `process`, which runs every frame:

```js
  move () {
    if (this.facing === 'left') this.position.x -= 2.5
    else if (this.facing === 'right') this.position.x += 2.5
  }
```

So the enemy moves one direction, until it hits a wall, or is at the edge of a platform, and then it turns around.  How does it know when to turn around?  This engine has a `FakeRaycast` property to feel ahead for these wandering nodes and see if it's time to turn back around again.  The property is called `FakeRaycast` because nobody should confuse how it works with how actual raycasts work.  Let's look at it:

### `FakeRaycast`

```js
class FakeRaycast {
  constructor (config) {
    this.parent = config.parent
    /* the Raycast is given a Vector2
    offset from it's parent node */
    this.offset = new Vector2({
      x: config.x,
      y: config.y
    })
    /* it's position is set to its parent's
    position plus its offset */
    this.position = this.offset.plus(this.parent.position)
    this.type = 'FakeRayCast'
    this.name = config.name
  }

  updatePosition () {
    /* anytime FakeRaycast collision needs
    to be checked, updatePosition can be called
    from the parent node */
    this.position = this.offset.plus(this.parent.position)
  }

  checkCollision (nodes, resolver) {
    /* called from the parent node,
    checkCollision sees if the FakeRaycast
    is inside of any bodies */
    nodes.filter(node => node !== this.parent)
      .map(node => {
        return {
          node,
          collision: this.aabbCollision(node),
          detail: this.aabbDetail(node)
        }
      })
      /* and executes the resolver callback
      function for each of them */
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
```

Notice that these AABB methods are slightly different than the `KinematicBody` methods.  The `FakeRaycast` is just a point.  It has a `Vector2` for position, but no dimensions.  No height and width.

Real raycasts are quite different.  They have a long history in games and were famously used to make old shooters like Doom and Wolfenstein 3D appear 3D even though they were drawn on a flat canvas... I think.

So, to come back to the `Enemy` class, it has these two properties defined in its `constructor`:

```js
    this.raycastLeft = new FakeRaycast({ // left collide check
      parent: this,
      x: -5, /* this point is 5px left of the enemy */      y: this.dimensions.y / 2, /* and halfway down its height */
      name: 'raycastLeft'
    })
    this.raycastRight = new FakeRaycast({ // right collide check
      parent: this,
      x: 5 + this.dimensions.x, /* this point is 5 px to the right of the enemy */
      y: this.dimensions.y / 2, /* and halfway down its height */
      name: 'raycastRight'
    })
```

So an `Enemy` is instantiated with two detection points just to its left and right.  It's `process` method calls `checkRaycasts`:

```js
  checkRaycasts () {
    this.fakeRaycasts.forEach(raycast => {
      raycast.updatePosition()
      raycast.checkCollision(this.scene.nodes, collision => {
        this.resolveRaycast(collision, raycast)
      })
    })
  }
```

This method updates the raycast positions, and calls their `checkCollision` methods.  Remember the `resolver` parameter from that method?  Here it's being defined as a callback to `resolveRaycast`.  Let's look at that:

```js
  resolveRaycast (collision, raycast) {
    // collision = { node, collision: true/false, detail: object of collision detail by direction }
    if (collision.collision === true && collision.node.type !== 'Player') {
      if (this.facing === 'right' && raycast.name === 'raycastRight') this.facing = 'left'
      else if (this.facing === 'left' && raycast.name === 'raycastLeft') this.facing = 'right'
    }
  }
```