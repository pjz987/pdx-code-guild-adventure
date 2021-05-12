/* globals config Body KinematicBody requestAnimationFrame */

const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')
// const w = cnv.width
// const h = cnv.height

ctx.fillStyle = '#36F7E7'
ctx.fillRect(0, 0, cnv.width, cnv.height)

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

/* Input Booleans */
let w
let a
let s
let d
let space
let q


const nodes = bricks.concat(player)

function play (_time) {
  const input = { w, a, s, d, space }
  ctx.clearRect(0, 0, cnv.width, cnv.height)
  ctx.fillStyle = '#36F7E7'
  ctx.fillRect(0, 0, cnv.width, cnv.height)
  nodes.forEach(node => node.process(nodes, input))
  nodes.forEach(node => node.draw(ctx))
  if (!q) requestAnimationFrame(time => play(time))
}

play()

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
