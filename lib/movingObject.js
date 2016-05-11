// TODO: Remove window.MovingObject
var MovingObject = window.MovingObject = function(pos, vel, radius, mass, color, game) {
  this.pos = pos;
  this.vel = vel;
  this.radius = radius;
  this.mass = mass
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
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  var distance =  Util.distance(this, otherObject);
  var sumRadii = this.radius + otherObject.radius;

  return (distance < sumRadii);
};

MovingObject.prototype.collideWith = function (otherObject) {
  if((this instanceof Mass) && (otherObject instanceof Mass)) {
    if (this.radius > otherObject.radius){
      this.radius = Math.sqrt((Math.PI * Math.pow(this.radius, 2) + (Math.PI * Math.pow(otherObject.radius, 2))) / Math.PI);
      this.game.removeMass(otherObject);
    } else if (this.radius < otherObject.radius) {
      otherObject.radius = Math.sqrt((Math.PI * Math.pow(this.radius, 2) + (Math.PI * Math.pow(otherObject.radius, 2))) / Math.PI);
      this.game.removeMass(this);
    }
  }
};

module.exports = MovingObject;
