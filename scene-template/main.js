/* globals */

const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')

const scene = new Scene({
  nodes: [] // initialize scene nodes above and include them in this array
})

function main (time=0) {
  scene.loop(time, ctx)
  requestAnimationFrame(time => main(time)) 
}

main()
