# Platformer Mechanics: Gravity and Jumping

The examples so far have produced scenes with top-down mechanics.  So, make a platformer, we're going to have to add 2 things: Gravity and Jumping.

## Gravity

Simulating gravity is actually pretty straightforward.  Let's take a look at this `Player` class' `applyGravity` method, which is called in the `process` method:

```js
  applyGravity () {
    this.velocity.y += this.gravity
  }
```

That's it.  Every frame the y-velocity is increased by `this.gravity`.  Remember that `KinematicBody.defaultHandleCollision` will set the y-velocity back to 0 for any vertical collision--you don't have to worry about the downward velocity continuing to increase while on the ground.

## Jumping

Actually jumping is just about as straight forward as applying gravity:

```js
  jump () {
    this.velocity.y = -this.jumpForce
  }
```

The trickier part is deciding *when* the `Player` should be able to jump.  The `jumpCheck` method is called in every frame:

```js
  jumpCheck (input, bodies) {
    /* if the user presses space or w */
    if (input.space === true || input.w === true) {
      /* a test body is created just below the player */
      const testBody = this.createTestBodyByDirection('down')
      /* we get all the test body's colliding bodies */
      const testCollidingBodies = testBody.checkCollisions(bodies)
        .filter(body => body !== this) // excluding the player
      /* if the test body is now colliding
      with the floor, we jump */
      if (testCollidingBodies.length > 0) this.jump()
    }
  }
```

So let's look at that `createTestBodyByDirection` method:

### `KinematicBody.createTestBodyByDirection`

```js
  createTestBodyByDirection (direction) {
    const offset = {}
    if (direction === 'up') offset.y = -0.002
    if (direction === 'down') offset.y = 0.002
    if (direction === 'left') offset.x = -0.002
    if (direction === 'right') offset.x = 0.002
    return this.createTestBody(offset)
  }
```

Given a string `direction`, it will return a test body with an x or y offset.  Let's look at the method that creates *that* body:

### `KinematicBody.createTestBody`

```js
  createTestBody (offset) {
    const testBody = new KinematicBody({
      x: offset.x
        ? this.position.x + offset.x
        : this.position.x,
      y: offset.y
        ? this.position.y + offset.y
        : this.position.y,
      width: this.dimensions.x,
      height: this.dimensions.y
    })
    return testBody
  }
```

So this method creates a brand new `KinematicBody` with all of the physics methods available to it, including `checkCollision`, which it used to register a hit, and the `Player` object knew it was okay to jump.

## Acceleration/Deceleration?

Should I talk about this?

```js
  applyHorizontalInput (input) {
    /* check if the user is trying to move left or right */
    if (input.a === true || input.left === true) {
      this.velocity.x -= this.acceleration
      if (this.velocity.x < -this.maxSpeed) {
        this.velocity.x = -this.maxSpeed
      }
    } else if (input.d === true || input.right === true) {
      this.velocity.x += this.acceleration
      if (this.velocity.x > this.maxSpeed) {
        this.velocity.x = this.maxSpeed
      }
    } else { /* if not, slow down the player */
      if (this.velocity.x < 0) {
        this.velocity.x += this.acceleration
        if (this.velocity.x > 0) this.velocity.x = 0
      } else if (this.velocity.x > 0) {
        this.velocity.x -= this.acceleration
        if (this.velocity < 0) this.velocity.x = 0
      }
    }
  }
```