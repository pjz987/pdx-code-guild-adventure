# AABB Collision
Axis-Aligned Bounding Box Collision (or AABB Collision) is one of the simplest collision-detection algorithms.  It works if the objects are axis-aligned (not rotated) and have a bounding box collision shape (in 2D space, their bounding boxes are squares or rectangles, with 90 degree angles).

Essentially, AABB Collilsion checks 4 things:
* Is Object 1 above Object 2?
* Is Object 1 below Object 2?
* Is Object 1 to the left of Object 2?
* Is Object 1 to the right of Object 2?

If the answer to all 4 of these questions is "No", then the objects are colliding.  In 3D space, you also check to see if the objects are in front of/behind one another (the z axis).  Kishimoto Studios has a great [example](https://kishimotostudios.com/articles/aabb_collision/) of this.

```js
class KinematicBody extends Body {

  /* Other KinematicBody methods... */

  /* Axis-Aligned Bounding Box Collision */
  aabbCollision (body) { // https://kishimotostudios.com/articles/aabb_collision/
    return !(
      this.position.x + this.dimensions.x < body.position.x || // this is to the left of body
      this.position.x > body.position.x + body.dimensions.x || // this is to the right of body
      this.position.y + this.dimensions.y < body.position.y || // this is above body
      this.position.y > body.position.y + body.dimensions.y // this is below body
    )
  }
}

```