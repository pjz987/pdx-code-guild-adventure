/* globals config Body */

const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')
const w = cnv.width
const h = cnv.height

ctx.fillStyle = '#36F7E7'
ctx.fillRect(0, 0, w, h)

const brickW = 120
const brickH = 20

Array(10).fill('').forEach(() => {
  const body = new Body(Math.random() * w, Math.random() * h, brickW, brickH, '#FFA346')
  body.draw(ctx)
})

setInterval(() => {
  const body = new Body(Math.random() * w, Math.random() * h, brickW, brickH, '#FFA346')
  body.draw(ctx)
}, 10000)
