var Util = require('./util.js');
var MovingObject = require('./movingObject.js');


var Ship = function(game){
  MovingObject.call(this, [window.innerWidth/2, window.innerHeight/2],
                    [0,0],
                    Ship.RADIUS,
                    Ship.SIZE,
                    Ship.COLOR, game);
};
Util.inherits(Ship, MovingObject);

Ship.RADIUS = 10;
Ship.SIZE = 500;
Ship.COLOR = "#FFF";

Ship.prototype.draw = function(ctx) {
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
  ctx.fillStyle = "black";
  ctx.font = this.radius * 0.5 + "px Verdana";
  ctx.textAlign = "center";
  ctx.fillText(Math.round(this.size), this.pos[0] , this.pos[1] + (0.2 * this.radius));
};


Ship.prototype.reset = function () {
  this.pos = [window.innerWidth/2,window.innerHeight/2];
  this.vel = [0,0];
  this.size = 500;
  this.radius = 10;
};

Ship.prototype.move = function(){
  this.pos = this.game.wrap(this.pos);
  this.pos[0] += (this.vel[0]);
  this.pos[1] += (this.vel[1]);

  this.vel[0] *= 0.999;
  this.vel[1] *= 0.999;
};

Ship.prototype.power = function(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.collideWith = function(otherObject){
  this.radius = Math.sqrt((Math.PI * Math.pow(this.radius, 2) + (Math.PI * Math.pow(otherObject.radius, 2))) / Math.PI);
  this.size += otherObject.size;
  this.game.removeMass(otherObject);
};

module.exports = Ship;