# Collision Resolution

Usually, checking whether or not a collision has occured is only half the battle and it's often the easier half.  If a platformer character jumps up onto a ledge and collides with it, we know they should land on top of it, but how does the program know?  How does it know to do something different than if the character bumped their head on a brick from underneath?  If the character can jump on top enemies to kill them, but dies if they collide laterally, how does the code know which outcome to produce?  It's time to take a deeper look at some of the `KinematicBody` methods:

### `KinematicBody.checkCollisions`

```js
  checkCollisions (bodies = this.scene.nodes) {
    return bodies
      .filter(body => body !== this) // the body is not this KinematicBody
      .filter(body => this.aabbCollision(body)) // the body is colliding with this KinematicBody
  }
```

This one is pretty simple.  It returns an array of every `Body` that the `KinematicBody` is collidng with, excluding itself.  You might remember there was a `checkCollisions` method in the `Player` class from the previous example.  Since that class extended `KinematicBody`, that method was overwritten.  FIX THIS IT'S DUMB!

### `KinematicBody.aabbDetail`

```js
  aabbDetail (body, position = this.position) {
    return {
      left: position.x + this.dimensions.x < body.position.x,
      right: position.x > body.position.x + body.dimensions.x,
      up: position.y + this.dimensions.y < body.position.y,
      down: position.y > body.position.y + body.dimensions.y
    }
  }
```

This `aabbDetail` method is like `aabbCollision`, however it returns an objects of booleans rather than a single boolean, and it can take `position` argument to check which is different from the object's current `position`.  Let's take a look at this `Player` class' `process` method:

```js
  process (data) {
    /* data = { input, time } */
    const lastPosition = new Vector2({
      x: this.position.x,
      y: this.position.y
    })

    /* after the following line... */
    this.move(data.input)
    /* ...this.position may be different than lastPosition */
    const collidingNodes = this.checkCollisions(this.scene.nodes)
    collidingNodes.forEach(node => {
      /* if a collision happens, we use the
      following method to resolve it */
      this.defaultHandleCollision(node, lastPosition)
    })
  }
```

This `process` method starts by recording its `position` before it moves.  If a collision is detected, it uses another `KinematicBody` method to resolve it.

### `KinematicBody.defaultHandleCollision`

```js
  defaultHandleCollision (node, lastPosition) {
    /* get an aabbDetail object for the last frame */
    const lastFrameAabb = this.aabbDetail(node, lastPosition)
    /* find out which aabbDetail object boolean
    was true before the collision occured */
    if (lastFrameAabb.up === true) {
      /* we hit the body from above */
      this.velocity.y = 0 /* our y-velocity stops */
      this.position.y = node.position.y - this.dimensions.y - 0.001
      /* our y-position is now that body's
      y-position minus our height */
    }
    if (lastFrameAabb.down === true) {
      /* we hit the body from below */
      this.velocity.y = 0 /* our y-velocity stops */
      this.position.y = node.position.y + node.dimensions.y + 0.001
      /* our y-position is now that body's
      y-position plus its height */
    }
    if (lastFrameAabb.left === true) {
      /* we hit the body from the left */
      this.velocity.x = 0 /* our x-velocity stops */
      this.position.x = node.position.x - this.dimensions.x - 0.001
      /* our x-position is now that body's
      x-position minus our width */
    }
    if (lastFrameAabb.right === true) {
      /* we hit the body from the right */
      this.velocity.x = 0 /* our x-velocity stops */
      this.position.x = node.position.x + node.dimensions.x + 0.001
      /* our x-position is now that body's
      x-position plus its width */
    }
  }
```

This `defaultHandleCollision` method can be used to resolve any collision that occurs in the scene.  It is most likely used for collision with the geometry of the game world.