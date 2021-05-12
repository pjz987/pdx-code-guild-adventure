/* globals config Body KinematicBody requestAnimationFrame */

const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')
// const w = cnv.width
// const h = cnv.height

ctx.fillStyle = '#36F7E7'
ctx.fillRect(0, 0, cnv.width, cnv.height)

const brickW = 120
const brickH = 20

const player = new KinematicBody({
  x: Math.random() * cnv.width,
  y: Math.random() * cnv.height,
  w: brickH,
  h: brickW,
  color: '#34A844'
})

const bricks = []

/* Input Booleans */
let w
let a
let s
let d
let space

for (let i = 0; i < 10; i++) {
  bricks.push(new Body({
    x: Math.random() * cnv.width,
    y: Math.random() * cnv.height,
    w: brickW,
    h: brickH,
    color: '#FFA346'
  }))
}

const nodes = bricks.concat(player)

function play (time) {
  const input = { w, a, s, d, space }
  ctx.clearRect(0, 0, cnv.width, cnv.height)
  ctx.fillStyle = '#36F7E7'
  ctx.fillRect(0, 0, cnv.width, cnv.height)
  nodes.forEach(node => node.process(nodes, input))
  nodes.forEach(node => node.draw(ctx))
  requestAnimationFrame(time => play(time))
}

play()

document.addEventListener('keydown', event => {
  if (event.key === 'w') w = true
  else if (event.key === 'a') a = true
  else if (event.key === 's') s = true
  else if (event.key === 'd') d = true
  else if (event.key === ' ') space = true
})

document.addEventListener('keyup', event => {
  if (event.key === 'w') w = false
  else if (event.key === 'a') a = false
  else if (event.key === 's') s = false
  else if (event.key === 'd') d = false
  else if (event.key === ' ') space = false
})
