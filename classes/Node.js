/* globals Vector2 */

const idGeneratorFunc = (num = 0) => () => num++
const idGenerator = idGeneratorFunc()

class Node {
  constructor (config) {
    this.type = 'Node'
    this.id = idGenerator()
    this.scene = config.scene
    this.collideable = false
    this.position = new Vector2({
      x: config.x || 0,
      y: config.y || 0
    })
    this.scene = config.scene || null
  }

  process () {
  }

  draw () {
  }
}
