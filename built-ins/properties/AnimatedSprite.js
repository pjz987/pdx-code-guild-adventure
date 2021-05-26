/* globals Sprite */

class AnimatedSprite extends Sprite {
  constructor (config) {
    super(config)
    this.frames = config.frames // number of frames
    this.frameWidth = config.frameWidth
    this.type = 'AnimatedSprite'
    this.currentFrame = 0
    this.frameInterval()
  }

  nextFrame () {
    this.currentFrame++
    this.currentFrame %= this.frames
  }

  frameInterval () {
    setInterval(() => {
      this.nextFrame()
      // console.log(this.currentFrame)
    }, 100)
  }
}
