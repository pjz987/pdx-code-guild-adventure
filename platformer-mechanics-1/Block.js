/* globals StaticBody */

class Block extends StaticBody {
  constructor (config) {
    config.height = config.height || 100
    config.width = config.width || 100
    config.color = '#ffa346'
    super(config)
  }
}
