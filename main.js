/* globals config Body KinematicBody */

const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')
const w = cnv.width
const h = cnv.height

ctx.fillStyle = '#36F7E7'
ctx.fillRect(0, 0, w, h)

const brickW = 120
const brickH = 20

const player = new KinematicBody({
  x: Math.random() * w,
  y: Math.random() * h,
  w: brickH,
  h: brickW,
  color: '#34A844'
})

const bricks = []

for (let i = 0; i < 10; i++) {
  bricks.push(new Body({
    x: Math.random() * w,
    y: Math.random() * h,
    w: brickW,
    h: brickH,
    color: '#FFA346'
  }))
}

const nodes = bricks.concat(player)

function play () {
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#36F7E7'
  ctx.fillRect(0, 0, w, h)
  nodes.forEach(node => node.process(nodes))
  nodes.forEach(node => node.draw(ctx))
  requestAnimationFrame(play)
}

play()
