/* globals Vector2 */

class Scene {
  constructor (config) {
    this.type = 'Scene'
    this.nodes = config.nodes || [] // this.nodes is an array all the nodes in the scene
    this.dimensions = new Vector2({
      x: config.width || 800,
      y: config.height || 600
    })
    this.backgroundColor = config.backgroundColor || '#36f7e7'
    // this.time = config.time || 0
    this.ctx = config.ctx // this.ctx is the 2D animation context for the Canvas API
    this.sprite = config.sprite || null
    this.parentSceneToNodes()
  }

  init () {
    this.nodes.forEach(node => {
      node.scene = this
    })
  }

  parentSceneToNodes () {
    this.nodes.forEach(node => {
      node.scene = this
    })
  }

  loop (time, input) {
    /* wipe the canvas */
    this.ctx.clearRect(
      0,
      0,
      this.dimensions.x,
      this.dimensions.y
    )

    /* fill in the background */
    if (this.sprite !== null) {
      this.ctx.drawImage(
        this.sprite.source,
        0,
        0
      )
    } else {
      this.ctx.fillStyle = this.backgroundColor
      this.ctx.fillRect(
        0,
        0,
        this.dimensions.x,
        this.dimensions.y
      )
    }

    /* call each node's process method */
    this.nodes.forEach(node => node.process({
      time,
      input,
      nodes: this.nodes
    }))

    /* call each node's draw method */
    this.nodes.forEach(node => node.draw(this.ctx))
  }
}
