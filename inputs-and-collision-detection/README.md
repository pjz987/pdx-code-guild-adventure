# User Inputs and AABB Collision

## Scene Initialization
Before jumping into these other concepts, let's take a quick look at how a scene is initialized:

```js
const cnv = document.querySelector('canvas') // the canvas element
const ctx = cnv.getContext('2d') // the animation context
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

const bodyWidth = 100

const player = new Player({ // instantiate a player
  x: cnv.width / 2 - 50,
  y: cnv.height / 2 - 50,
  width: bodyWidth,
  height: bodyWidth,
  color: '#34A844'
})

const bricks = [ // instantiate 4 bricks
  new Body({ x: 100, y: 100, width: bodyWidth, height: bodyWidth, color: '#ffa346' }),
  new Body({ x: 100, y: cnv.height - 200, width: bodyWidth, height: bodyWidth, color: '#ffa346' }),
  new Body({ x: cnv.width - 200, y: 100, width: bodyWidth, height: bodyWidth, color: '#ffa346' }),
  new Body({ x: cnv.width - 200, y: cnv.height - 200, width: bodyWidth, height: bodyWidth, color: '#ffa346' })
]

const scene = new Scene({ // instantiate the scene
  nodes: [...bricks, player] // with the nodes
  ctx // and context
})
```

The 4 bricks are instances of the `Body` class.  `Body` extends `Node` and has a `dimensions` property (`Vector2`) to keep track of height and width.

## User Inputs

JavaScript is a multi-paradigm programming languages.  One of those paradigms is the event-driven paradigm, not unlike the [Observer Pattern](https://gameprogrammingpatterns.com/observer.html) used in games.  In JavaScript, we can make the `document` listen to [keyboard events](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent):

```js
/* Input Booleans */
// declare the input booleans so they're
// accessible in the following functions 
let w = false
let a = false
let s = false
let d = false
let space = false
let q = false

/* on the 'keydown' event, check the event's
key property and set that boolean to true */
document.addEventListener('keydown', event => {
  if (event.key === 'w') w = true
  else if (event.key === 'a') a = true
  else if (event.key === 's') s = true
  else if (event.key === 'd') d = true
  else if (event.key === ' ') space = true
  else if (event.key === 'q') q = true
})

/* on the 'keyup' event, check the event's
key proerty and set that boolean to false */
document.addEventListener('keyup', event => {
  if (event.key === 'w') w = false
  else if (event.key === 'a') a = false
  else if (event.key === 's') s = false
  else if (event.key === 'd') d = false
  else if (event.key === ' ') space = false
  else if (event.key === 'q') q = false
})

function play (time) {
  /* pass the inputs to the scene
  loop in an input object */
  const input = { w, a, s, d, space }
  scene.loop(time, input)
  if (!q) window.requestAnimationFrame(time => play(time))
}

play()
```

Now let's take a look at the `Player` class.  But first a quick note: in this game engine, `Player` is not a built-in class.  It is always a unique user-defined class that extends `KinematicBody`.  Most of these examples use a `Player` class but none of they are all different, as they've been coded for different purposes.  Let's look at some of the methods of this `Player` class:

```js
  process (data) {
    /* data = { input, time} */
    this.checkCollisions(this.scene.nodes) // we'll come back to this later
    this.move(data.input)
  }

  move (input) { /* move takes that object of input booleans
    and alters the position of the object based on which
    are true */
    if (input.w === true) this.position.y -= 6
    if (input.a === true) this.position.x -= 6
    if (input.s === true) this.position.y += 6
    if (input.d === true) this.position.x += 6
  }
}
```

But it's not just keyboard events you could pass as inputs.  The [mouse event](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) could just as easily be utilized for user inputs.  In fact, it's `event.clientX` and `event.clientY` properties would give you the exact coordinates on the canvas of a mouse event.

## AABB Collision

Axis-Aligned Bounding Box Collision (or AABB Collision) is one of the simplest collision-detection algorithms.  It works if the objects are axis-aligned (not rotated) and have a bounding box collision shape (in 2D space, their bounding boxes are squares or rectangles, with 90 degree angles).

Essentially, AABB Collilsion checks 4 things:
* Is Object 1 above Object 2?
* Is Object 1 below Object 2?
* Is Object 1 to the left of Object 2?
* Is Object 1 to the right of Object 2?

If the answer to all 4 of these questions is "No", then the objects are colliding.  In 3D space, you also check to see if the objects are in front of/behind one another (the z axis).  Kishimoto Studios has a great [example](https://kishimotostudios.com/articles/aabb_collision/) of this.

```js
class KinematicBody extends Body {

  /* Other KinematicBody methods... */

  /* Axis-Aligned Bounding Box Collision */
  aabbCollision (body) { // https://kishimotostudios.com/articles/aabb_collision/
    return !(
      this.position.x + this.dimensions.x < body.position.x || // this is to the left of body
      this.position.x > body.position.x + body.dimensions.x || // this is to the right of body
      this.position.y + this.dimensions.y < body.position.y || // this is above body
      this.position.y > body.position.y + body.dimensions.y // this is below body
    )
  }
}

```

So the `Player` class has access to the `aabbCollision` method.  Let's take a look at that `checkCollisions` method it calls in `process`:

```js
  checkCollisions (bodies) {
    let isColliding = false
    bodies.forEach(body => {
      if (body === this) return
      if (this.aabbCollision(body)) isColliding = true
    })
    if (isColliding === true) this.color = '#F54B7E'
    else this.color = '#94D48C'
  }
```

All this `Player` class will do is change it's color based ont whether or not it's colliding with one of the bricks, but collision resolution can often be more complicated than that.
