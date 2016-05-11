var Util = require('./util.js');
var MovingObject = require('./movingObject.js');

var Mass = function(pos, game) {
  var radius = (Math.random() * 14) + 7;
  var size = radius * 5;
  var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
  var vel = Util.randomVec();

  // create more tangential initial velocity vectors in relation to origin
  var wOrigin = (window.innerWidth / 2);
  var hOrigin = (window.innerHeight / 2);
  if ((pos[0] - wOrigin) * (pos[1] - hOrigin) > 0) {
    vel[0] *= -1;
    vel[1] *= 1;
  } else if ((pos[0] - wOrigin) * (pos[1] - hOrigin) < 0) {
    vel[0] *= 1;
    vel[1] *= -1;
  }
  MovingObject.call(this, 
                    pos,
                    vel,
                    radius,
                    size,
                    randomColor, game);
};

Util.inherits(Mass, MovingObject);


Mass.prototype.collideWith = function (otherObject) {
  if((this instanceof Mass) && (otherObject instanceof Mass)) {
    if (this.radius >= otherObject.radius){
      this.radius = Math.sqrt((Math.PI * Math.pow(this.radius, 2) + (Math.PI * Math.pow(otherObject.radius, 2))) / Math.PI);
      this.size += otherObject.size;
      this.game.removeMass(otherObject);
    }
  }
};

module.exports = Mass;
