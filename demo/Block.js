/* globals StaticBody */

class Block extends StaticBody {
  constructor (config) {
    config.height = config.height || 100
    config.width = config.width || 100
    config.color = '#ffa346'
    config.color = 'rgba(255, 163, 71, 0.47)'
    super(config)
  }
}
