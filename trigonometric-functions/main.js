/* globals Scene Sine */

const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')

const sin = new Sine({
  x: 104,
  y: 236
})

const cos = new Cosine({
  x: 336,
  y: 236
})

const tan = new Tangent({
  x: 568,
  y: 236
})

const scene = new Scene({
  nodes: [sin, cos, tan]
})

function main (time=0) {
  scene.loop(time, ctx)
  requestAnimationFrame(time => main(time))
} 

main()










// const circle = {
//   r: 64,
//   x: 400,
//   y: 300,
//   color: 'orange'
// }

// function loop (time=0) {
//   ctx.clearRect(0, 0, cnv.width, cnv.height)
//   ctx.beginPath()
//   ctx.arc(
//     circle.x,// - Math.abs(Math.tan(time / 1000) * 50) , // + Math.cos(time / 1000) * 50,
//     circle.y,// - Math.abs(Math.tan(time / 1000) * 50),
//     circle.r,
//     0,
//     2 * Math.PI
//   )
//   ctx.fillStyle = circle.color
//   ctx.fill()
//   ctx.stroke()
//   requestAnimationFrame(time => loop(time))
// }

// loop()
