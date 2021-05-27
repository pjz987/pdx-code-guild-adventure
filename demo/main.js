/* globals Scene Player Block Enemy Sprite AnimatedSprite */

const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')

const blocks = [
  new Block({ // left wall
    x: -100,
    y: 0,
    height: cnv.height,
    hide: true
  }),
  new Block({ // ceiling
    x: 0,
    y: -100,
    width: cnv.width,
    hide: true
  }),
  new Block({ // right wall
    x: cnv.width,
    y: 0,
    height: cnv.height,
    hide: true
  }),
  new Block({ // floor
    x: 0,
    y: cnv.height,
    width: cnv.width,
    hide: true
  }),

  // platorms
  new Block({ // bottom
    x: 312.5,
    y: cnv.height - 150,
    width: 175,
    height: 50
  }),
  new Block({ // top
    x: 312.5,
    y: 125,
    width: 175,
    height: 50
  }),
  new Block({ // left
    x: 100,
    y: 287.5,
    width: 175,
    height: 50
  }),
  new Block({ // right
    x: cnv.width - 287.5,
    y: 287.5,
    width: 175,
    height: 50
  })
]

const spriteSheetRunLeft = document.querySelector('#run-left')
const spriteSheetRunRight = document.querySelector('#run-right')
const spriteFaceLeft = document.querySelector('#face-left')
const spriteFaceRight = document.querySelector('#face-right')

const stillSprite = new Sprite({
  source: spriteFaceRight
})

const animatedSprite = new AnimatedSprite({
  source: spriteSheetRunRight,
  frames: 8,
  frameWidth: 48
})

const player = new Player({
  x: cnv.width / 2 - 50,
  y: cnv.height / 2 - 50,
  width: 48,
  height: 78,
  // color: '#34A844',
  sprite: stillSprite,

  spriteSheetRunRight,
  spriteSheetRunLeft,
  spriteFaceLeft,
  spriteFaceRight,

  animatedSprite,
  stillSprite
})

const bugRight = document.querySelector('#bug-right')
const bugLeft = document.querySelector('#bug-left')

const bugSpriteLeft = new Sprite({
  source: bugLeft
})

const bugSpriteRight = new Sprite({
  source: bugRight
})

const enemies = [
  new Enemy({ // wide floor enemy
    x: cnv.width / 2 - 75,
    y: cnv.height - 56,
    width: 100,
    height: 56,
    color: '#b930cf',
    sprite: bugSpriteLeft,
    bugSpriteRight,
    bugSpriteLeft
  }),
  new Enemy({ // left platform enemy
    x: 100,
    y: 231.5,
    width: 100,
    height: 56,
    facing: 'right',
    color: '#b930cf',
    sprite: bugSpriteRight,
    bugSpriteLeft,
    bugSpriteRight
  }),
  new Enemy({ // right platform enemy
    x: cnv.width - 182.5,
    y: 231.5,
    width: 100,
    height: 56,
    facing: 'left',
    // sprite: bugLeft,
    color: '#b930cf',
    sprite: bugSpriteLeft,
    bugSpriteLeft,
    bugSpriteRight
  })
]

const enemyBumpers = [
  new Block({
    x: 80,
    y: 212.5,
    width: 20,
    height: 75,
    hide: true,
    collideWith: 'Enemy'
  }),
  new Block({
    x: 275,
    y: 212.5,
    width: 20,
    height: 75,
    hide: true,
    collideWith: 'Enemy'
  }),
  new Block({
    x: cnv.width - 307.5,
    y: 212.5,
    width: 20,
    height: 75,
    hide: true,
    collideWith: 'Enemy'
  }),
  new Block({
    x: cnv.width - 112.5,
    y: 212.5,
    width: 20,
    height: 75,
    hide: true,
    collideWith: 'Enemy'
  })
]

const backgroundImage = document.querySelector('#background')

const scene = new Scene({
  ctx, // give the scene the animation rendering context
  nodes: [...blocks, player, ...enemies, ...enemyBumpers], // initialize scene nodes above and include them in this array
  sprite: new Sprite({
    source: backgroundImage
  })
})

scene.init()

function main (time = 0) {
  const input = { space, w, a, s, d, up, down, left, right, q }
  scene.loop(time, input)
  if (input.q) return
  window.requestAnimationFrame(time => main(time))
}

/* Input Booleans */
let space
let w
let a
let s
let d
let up
let down
let left
let right
let q

/* set inputs to true on 'keydown' */
document.addEventListener('keydown', event => {
  // event.preventDefault()
  if (event.key === ' ') space = true
  if (event.key === 'w') w = true
  if (event.key === 'a') a = true
  if (event.key === 's') s = true
  if (event.key === 'd') d = true
  if (event.key === 'ArrowUp') up = true
  if (event.key === 'ArrowDown') down = true
  if (event.key === 'ArrowLeft') left = true
  if (event.key === 'ArrowRight') right = true
  if (event.key === 'q') q = true
})

/* set inputs to false on 'keyup' */
document.addEventListener('keyup', event => {
  // event.preventDefault()
  if (event.key === ' ') space = false
  if (event.key === 'w') w = false
  if (event.key === 'a') a = false
  if (event.key === 's') s = false
  if (event.key === 'd') d = false
  if (event.key === 'ArrowUp') up = false
  if (event.key === 'ArrowDown') down = false
  if (event.key === 'ArrowLeft') left = false
  if (event.key === 'q') q = false
})

main()

cnv.addEventListener('click', event => console.log(
  { x: event.clientX, y: event.clientY },
  scene
))
