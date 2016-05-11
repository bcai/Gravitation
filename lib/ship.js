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


Ship.prototype.reset = function () {
  this.pos = [window.innerWidth/2,window.innerHeight/2];
  this.vel = [0,0];
  this.size = 500;
  this.radius = 10;
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