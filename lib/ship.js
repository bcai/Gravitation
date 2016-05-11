var Ship = window.Ship = function(game){
  MovingObject.call(this, [window.innerWidth/2, window.innerHeight/2],
                    [0,0],
                    Ship.RADIUS,
                    Ship.SIZE,
                    Ship.COLOR, game);
};
Util.inherits(Ship, MovingObject);

Ship.RADIUS = 10;
Ship.SIZE = 200;
Ship.COLOR = "#FFF";


Ship.prototype.reset = function () {
  this.pos = [window.innerWidth/2,window.innerHeight/2];
  this.vel = [0,0];
};


Ship.prototype.power = function(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

module.exports = Ship;