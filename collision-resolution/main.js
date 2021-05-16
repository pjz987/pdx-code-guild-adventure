/* globals Player Block */

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
  nodes: [...blocks, player]
})

function main (time=0) {
  scene.loop(time, ctx)
  requestAnimationFrame(time => main(time))
}

main()
