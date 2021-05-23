const idGeneratorFunc = (num = 0) => () => num++
const idGenerator = idGeneratorFunc()

class Node {
  constructor (config) {
    this.type = 'Node'
    this.id = idGenerator()
    this.scene = config.scene
    this.collideable = false
  }

  process () {
  }
}
