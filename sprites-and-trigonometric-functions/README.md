# Sprites & Trigonometric Functions

## Sprites

In 2D game design, a sprite is an image used to render a character on the screen.  In this engine, the `Sprite` class is a property that can be given to a `Scene` or `Node`.  If that property is defined, the object will draw itself with a sprite source instead of the default `ctx.fillRect` drawing.  Let's start by seeing the source images included in the HTML document:

```html
<body>

  <!-- Canvas -->
  <canvas width="800" height="600"></canvas>

  <!-- Images -->
  <img src="../assets/sin-logo.png" id="sin">
  <img src="../assets/cos-logo.png" id="cos">
  <img src="../assets/tan-logo.png" id="tan">

  <!-- Audio -->

</body>
```

