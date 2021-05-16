/* globals */

const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')

const scene = new Scene({
  ctx, // give the scene the animation rendering context
  nodes: [] // initialize scene nodes above and include them in this array
})

function main (time=0) {
  const input = { space }
  scene.loop(time, input)
  requestAnimationFrame(time => main(time)) 
}

main()

/* Input Booleans */
let space

/* set inputs to true on 'keydown' */
document.addEventListener('keydown', event => {
  if (event.key === ' ') space = true
})

/* set inputs to false on 'keyup' */
document.addEventListener('keyup', event => {
  if (event.key === ' ') space = false
})
