class Scene {
  constructor (config) {
    this.nodes = config.nodes || [] // this.nodes is an array all the nodes in the scene
    this.dimensions = new Vector2({
      x: config.width || 800,
      y: config.height || 600
    })
    this.backgroundColor = config.backgroundColor || '#36f7e7'
  }

  loop (time, ctx, input) {
    ctx.clearRect(
      0,
      0,
      this.dimensions.x,
      this.dimensions.y
    )
    ctx.fillStyle = this.backgroundColor
    ctx.fillRect(
      0,
      0,
      this.dimensions.x,
      this.dimensions.y
    )
    this.nodes.forEach(node => node.process({
      time,
      input,
      nodes: this.nodes
    }))
    this.nodes.forEach(node => node.draw(ctx))
  }
}