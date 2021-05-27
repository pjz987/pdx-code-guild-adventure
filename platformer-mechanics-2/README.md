# Platformer Mechanics: Enemies

## Resolving Player Collision With Enemies

Now it's time to give our player some baddies to jump on.  This player's `process` method is very similar to the last one, but let's take a look at this excerpt:

```js
    const collidingNodes = this.checkCollisions(data.nodes)
    collidingNodes.forEach(node => {
      if (node.collideWith !== undefined) return
      if (node.type === 'Enemy') this.handleEnemyCollision(node, lastPosition)
      else this.defaultHandleCollision(node, lastPosition)
    })
```

So, if a collision is detected with a `Node` of type `'Enemy'`, a different method handles collision.  Let's take a look at this player's `handleEnemyCollision` method, as well as it's two possible outcomes, `kill` and `die`:

```js
  handleEnemyCollision (enemy, lastPosition) {
    const lastFrameAabb = this.aabbDetail(enemy, lastPosition)
    /* if the player was above the enemy on
    the last frame, kill the enemy */
    if (lastFrameAabb.up === true) this.kill(enemy)
    /* otherwise, kill the player */
    else this.die()
  }

  die () {
    const index = this.scene.nodes.indexOf(this)
    this.scene.nodes.splice(index, 1)
  }

  kill (enemy) {
    const index = this.scene.nodes.indexOf(enemy)
    this.scene.nodes.splice(index, 1)
    this.jump(0.75)
  }
```

The unfortunate player or enemy is [spliced](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) out of the scene's array of nodes.  This is a very simple way of handling enemy/player death.  A more advanced way could implement death effects or animations, change game state, or do any number of things the designer wants.

## Enemy AI
The `Enemy` class extends `KinematicBody`.  It has a `move` method, called in `process`, which runs every frame:

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

Real raycasts are quite different.  They have a long history in games and were famously used to make old shooters like Doom and Wolfenstein 3D appear 3D even though they were drawn on a flat canvas and are used for collision in modern games.

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