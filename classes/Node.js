/* globals Sprite */

const idGeneratorFunc = (num=0) => () => num++
const idGenerator = idGeneratorFunc()

class Node {
  constructor (_config) {
    this.type = 'Node'
    this.id = idGenerator()
  }

  process () {
  }
}
