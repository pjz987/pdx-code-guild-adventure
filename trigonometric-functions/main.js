const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')


const circle = {
  r: 64,
  x: 400,
  y: 300,
  color: 'orange'
}

function loop (time=0) {
  ctx.clearRect(0, 0, cnv.width, cnv.height)
  ctx.beginPath()
  ctx.arc(
    circle.x,// - Math.abs(Math.tan(time / 1000) * 50) , // + Math.cos(time / 1000) * 50,
    circle.y,// - Math.abs(Math.tan(time / 1000) * 50),
    circle.r,
    0,
    2 * Math.PI
  )
  ctx.fillStyle = circle.color
  ctx.fill()
  ctx.stroke()
  requestAnimationFrame(time => loop(time))
}

loop()
