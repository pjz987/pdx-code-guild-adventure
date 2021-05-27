/* globals Body */

/* Node > Body > StaticBody */
class StaticBody extends Body {
  constructor (config) {
    super(config)
    this.type = 'StaticBody'
    this.color = config.color || '#f3b87c'
  }
}
