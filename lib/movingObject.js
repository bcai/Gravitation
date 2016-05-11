var Util = require('./util.js');

var MovingObject = function(pos, vel, radius, size, color, game) {
  this.pos = pos;
  this.vel = vel;
  this.radius = radius;
  this.size = size;
  this.color = color;
  this.game = game;
};

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos = this.game.wrap(this.pos);
  this.pos[0] += (this.vel[0] * 0.1);
  this.pos[1] += (this.vel[1] * 0.1);
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  var distance =  Util.distance(this, otherObject);
  var sumRadii = (this.radius * 0.175) + (otherObject.radius * 0.175);
  return (distance < sumRadii);
};

module.exports = MovingObject;
