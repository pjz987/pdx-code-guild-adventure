# PDX Code Guild Adventure -- A Tiny 2D Game Engine In Vanilla JS

## Why Make A Game Engine From Scratch?

Learning a game engine is hard.  There are so many built-in features, so many different classes, functions, methods that it's hard to know what *exactly* everything does.  For programmers used to writing code, the GUI of a game engine can be overwhelming and disorienting when compared to neatly organized directories of text files.  Even [JavaScript game engines](https://gamefromscratch.com/javascript-game-engines/) demand a different set of skills than the ones web developers use every day.

The purpose of this engine is to demystify how game engines work.  With just nine built-in classes, any designer can read the source code and see what a given object's methods are doing under the hood.  Each project runs on a single HTML file with `<script>` tags loading all the built-in classes and an attached `main.js` script where the designer initializes the game objects and scene, polls player inputs, and runs the scene loop.  There is a [new project template](project-template/) that comes with everything you need to get started before adding your own code.

## HTML5 Canvas

Putting together a game engine in JavaScript would be much harder without a built-in way to render shapes and images onto the screen.  Luckily, the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) makes this very simple, especially for 2D animations.  So simple, in fact, that only about 40 lines of code in this engine actually use the [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) interface.

## What Can This Engine Do?

#### Physics and Game Logic
This engine "can" do just about anything with 2D physics and game logic, but the more complex a designer wants their game to be, the more heavy-lifiting their own code is going to have to do. There is built-in functionality for:
* Basic collision detection and resolution, so long as the collision shapes are Axis-Aligned Bounding Boxes.
* Automatic update and draw calls to all physics bodies, so long as they are direct children to the parent `Scene` object.

#### Graphical Rendering
This engine supports:
* The drawing of rectangles (the dimensions of each physics body) with any valid CSS color
* The drawing of sprites and animated sprites to the Canvas, given that they meet a certain structure.

However:
* There is no direct access to the GPU for any shader code, although there is quite a bit a designer could add to a project using the Canvas API.

This engine is for beginners to game design.  At a certain point, it will be easier to learn a more robust engine.

## Shoutouts To The Godot Engine And HeartBeast

[Godot](https://godotengine.org/) is the first game engine I learned.  It is completely free and open-source and has a scripting language based on Python, which was great for me as a game-design newbie who only knew Python and JavaScript at the time.  Godot is a real up-and-comer and is carving out a niche for itself in the indie game-dev scene previously dominated by Unity and Unreal.  Some of the terms used here: the `Node` and `KinematicBody` classes, as well as the `process` method, are borrowed from Godot.

[HeartBeast](https://www.youtube.com/user/uheartbeast) is a Godot developer and educator who specializes in 2D pixel art games.  His YouTube videos and 1-Bit-Godot Course were instrumental in my games-development education and I wouldn't have been able to put together this project without what I learned there.

## What's Next For This Engine?

### Cleanup

The code needs a bit of a cleanup and some refactoring.  There is some inconsistent term usage in the parameters (see `node` vs `body` in the collision methods) and additional comments should be added for every property and method of the built-in classes.

### Additional Features

At the time of presentation, this engine was missing a couple planned features:
#### Audio -- Music and Sound
This fell out of scope of this presentation but should be relatively simple to add: [MDN Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

#### Scene Transitions
A planned feature for this engine was to have scene transitions built-in.  This can still be done by designers using this engine but a more out-of-the-box functionality is planned.

#### User Interface
User Interfaces, like menus and a HUD, are planned to be added to this engine.

## A Note on Assets
These sample games use pixel art PNGs created with [Aseprite](https://www.aseprite.org/).  However, any [browser-supported image format](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#supported_image_formats) can also be used in this engine.  There are lots of free assets for 2D games available online on sites like [itchi.io](https://itch.io/game-assets/free/tag-pixel-art).