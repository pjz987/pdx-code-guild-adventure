/* globals KinematicBody Sprite */

class Tangent extends KinematicBody {
  constructor (config) {
    super(config)
    this.sprite = new Sprite({
      source: document.querySelector('#tan')
    })
    this.startingPosition = new Vector2({
      x: config.x || 0,
      y: config.y || 0
    })
  }

  process (processData) {
    this.position.y = this.startingPosition.y + Math.tan(processData.time / 1000) * 64
  }
}