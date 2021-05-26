/* globals Player Block Scene */

const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')

const blocks = [
  new Block({ x: 100, y: 100 }),
  new Block({ x: 100, y: cnv.height - 200 }),
  new Block({ x: cnv.width - 200, y: 100 }),
  new Block({ x: cnv.width - 200, y: cnv.height - 200 })
]

const player = new Player({
  x: cnv.width / 2 - 50,
  y: cnv.height / 2 - 50,
  width: 100,
  height: 100,
  color: '#34A844'
})

const scene = new Scene({
  ctx,
  nodes: [...blocks, player]
})

/* Input Booleans */
let w = false
let a = false
let s = false
let d = false
let space = false

function main (time = 0) {
  const input = { w, a, s, d, space }
  scene.loop(time, input)
  window.requestAnimationFrame(time => main(time))
}

main()

/* set inputs to true on 'keydown' */
document.addEventListener('keydown', event => {
  if (event.key === 'w') w = true
  else if (event.key === 'a') a = true
  else if (event.key === 's') s = true
  else if (event.key === 'd') d = true
  else if (event.key === ' ') space = true
})

/* set inputs to false on 'keyup' */
document.addEventListener('keyup', event => {
  if (event.key === 'w') w = false
  else if (event.key === 'a') a = false
  else if (event.key === 's') s = false
  else if (event.key === 'd') d = false
  else if (event.key === ' ') space = false
})
