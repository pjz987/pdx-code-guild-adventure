# Scenes, Nodes and Properties

## Scenes

When a game is running, everything in it, the player, the enemies, the NPCs, the world, weapons, every texture, shader, mesh, sprite--everything belongs to a hierarchy of objects.  At the very top of that hierarchy is a `Scene` object, from which every other object descends.  Most game engines have a tree structure, where any object can have other objects as children.  For the purposes of this game engine, only the scene itself has children.  Let's look at the scene's constructor:

```js
class Scene {
  constructor (config) {
    this.type = 'Scene'
    this.nodes = config.nodes || [] // this.nodes is an array all the nodes in the scene
    this.dimensions = new Vector2({
      x: config.width || 800,
      y: config.height || 600
    })
    this.backgroundColor = config.backgroundColor || '#36f7e7'
    this.ctx = config.ctx // this.ctx is the 2D animation context for the Canvas API
  }
}
```

To update game logic and canvas drawing, the scene calls its `loop` method.  This runs once every frame and is called in the main script every time the screen refreshes:

```js
  loop (time, input) {

    /* Before the following lines, the loop method clears the canvas and fills in the background */

    /* call each node's process method */
    this.nodes.forEach(node => node.process({
      time, // note the time and input parameters
      input, // we will come back to these later
      nodes: this.nodes
    }))

    /* call each node's draw method */
    this.nodes.forEach(node => node.draw(this.ctx))
  }
```

Note: the `forEach` array method is blocking, not asynchronous, which means that the callback function for each node will be fully executed before the next one begins.  This is a good thing.  It means game logic will always run in a certain order and things like collision for two different objects won't be handled with data that is no longer accurate.

MDN Docs: [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

## Nodes

Every object in the scene's nodes array is an instance of a `Node` or a class that inherits from `Node`.  This is the basic game object.  You probably wouldn't instantiate a `Node` object, but it comes with some helpful boilerplate.  This is the entirety of the class `Node` definition:

```js
class Node {
  constructor (config) {
    this.type = 'Node'
    this.id = idGenerator() // every node has a unique ID
    this.scene = config.scene || null // every node has a reference to its scene
    this.collideable = false // by default, collision is turned off
    this.position = new Vector2({ // every node has x and y position
      x: config.x || 0,
      y: config.y || 0
    })
  }

  process () {
  }

  draw () {
  }
}
```

Note the two empty methods: `process` and `draw`.  By default these methods don't do anything, but they are included as placeholders so the code doesn't error out when calling these methods for every node in the scene's `loop` method.

Now let's take a look at the `Player` class.  It extends `KinematicBody`, a physics body used with code-controlled movement, ideal for the player character.  It also inherits from `Node` and `Body`.

```js
/* Node > Body > KinematicBody > Player */
class Player extends KinematicBody {
  constructor (config) {
    super(config)
    this.color = 'rosybrown'
    this.moving = 'right'
  }

  process () {
    if (this.moving === 'right') {
      this.position.x += 2.5
      if (this.position.x > this.scene.dimensions.x * (2 / 3)) this.moving = 'down'
    } else if (this.moving === 'down') {
      this.position.y += 2.5
      if (this.position.y > this.scene.dimensions.y * (2 / 3)) this.moving = 'left'
    } else if (this.moving === 'left') {
      this.position.x -= 2.5
      if (this.position.x < this.scene.dimensions.x * (1 / 3) - this.dimensions.x) this.moving = 'up'
    } else if (this.moving === 'up') {
      this.position.y -= 2.5
      if (this.position.y < this.scene.dimensions.y * (1 / 3) - this.dimensions.x) this.moving = 'right'
    }
  }
}
```

This `Player` class has a fairly simple `process` method.  It moves in a given direction until it exceeds a certain boundary on the x- or y-axis.  Then begins moving the in a new direction.  So on and so forth.

## Properties

Like any JavaScript object, an instance of the `Player` class has properties such as `color`, which is used in the `draw` method, and `moving`, which is a unique property to the class used in the `process` method.  Additionally, all nodes have a `position` property which is an instance of `Vector2`:

```js
class Vector2 {
  constructor (config) {
    this.x = config.x ? config.x : 0
    // this.x = config.x // ? config.x : 0
    this.y = config.y ? config.y : 0
    // this.y = config.y // ? config.y : 0
    this.type = 'Vector2'
  }

  minus (vector2) {
    return new Vector2({
      x: this.x - vector2.x,
      y: this.y - vector2.y
    })
  }

  plus (vector2) {
    return new Vector2({
      x: this.x + vector2.x,
      y: this.y + vector2.y
    })
  }

  normalize () {
    // coming soon
    // https://www.wikihow.com/Normalize-a-Vector
  }
}
```

`Vector2` is essentially an object used to keep track of an x and y value with a couple methods to make vector math a little easier for the programmer.  It is the most commonly used class-based property in this engine.  Object position, height and width, and velocity are all stored as a `Vector2` instance.

Unlike the nodes that have `Vector2` instances as properties, `Vector2` is not itself a node and doesn't have a `process` or `draw` method.  Another example of a property from this engine is `Sprite`, which is used to draw an image to the canvas instead of a a rectangle.