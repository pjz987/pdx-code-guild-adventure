/* globals Scene Sine Cosine Tangent */

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
  ctx,
  nodes: [sin, cos, tan]
})

function main (time = 0) {
  scene.loop(time, ctx)
  window.requestAnimationFrame(time => main(time))
}

main()
