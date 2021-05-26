/* globals Scene */

const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')

const scene = new Scene({
  ctx, // give the scene the animation rendering context
  nodes: [] // initialize scene nodes above and include them in this array
})

/* Input Booleans */
let space

/* set inputs to true on 'keydown' */
document.addEventListener('keydown', event => {
  event.preventDefault() // Prevents a key's default event https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  // console.log(event.key) // comment in to see what the event's 'key' property is
  if (event.key === ' ') space = true
})

/* set inputs to false on 'keyup' */
document.addEventListener('keyup', event => {
  event.preventDefault()
  if (event.key === ' ') space = false
})

function main (time=0) {
  const input = { space }
  scene.loop(time, input)
  requestAnimationFrame(time => main(time)) 
}

main()
