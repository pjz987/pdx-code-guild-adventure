/* globals Player Body Scene */

const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')

const bodyWidth = 100

const player = new Player({
  x: cnv.width / 2 - 50,
  y: cnv.height / 2 - 50,
  width: bodyWidth,
  height: bodyWidth,
  color: '#34A844'
})

const bricks = [
  new Body({ x: 100, y: 100, width: bodyWidth, height: bodyWidth, color: '#ffa346' }),
  new Body({ x: 100, y: cnv.height - 200, width: bodyWidth, height: bodyWidth, color: '#ffa346' }),
  new Body({ x: cnv.width - 200, y: 100, width: bodyWidth, height: bodyWidth, color: '#ffa346' }),
  new Body({ x: cnv.width - 200, y: cnv.height - 200, width: bodyWidth, height: bodyWidth, color: '#ffa346' })
]

const nodes = bricks.concat(player)

const scene = new Scene({
  nodes,
  ctx
})

/* Input Booleans */
let w = false
let a = false
let s = false
let d = false
let space = false
let q = false

document.addEventListener('keydown', event => {
  if (event.key === 'w') w = true
  else if (event.key === 'a') a = true
  else if (event.key === 's') s = true
  else if (event.key === 'd') d = true
  else if (event.key === ' ') space = true
  else if (event.key === 'q') q = true
})

document.addEventListener('keyup', event => {
  if (event.key === 'w') w = false
  else if (event.key === 'a') a = false
  else if (event.key === 's') s = false
  else if (event.key === 'd') d = false
  else if (event.key === ' ') space = false
  else if (event.key === 'q') q = false
})

function play (time) {
  const input = { w, a, s, d, space }
  scene.loop(time, input)
  if (!q) window.requestAnimationFrame(time => play(time))
}

play()
