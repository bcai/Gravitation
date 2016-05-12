var Mass = require('./mass.js');
var Ship = require('./ship.js');
var Util = require('./util.js');

var Game = function() {
  this.dimX = Game.DIM_X;
  this.dimY = Game.DIM_Y;
  this.numMasses = Game.NUM_MASSES;
  this.masses = [];
  this.addMasses();
  this.ship = new Ship(this);
  this.antiGravity = false;
};

Game.DIM_X = window.innerWidth;
Game.DIM_Y = window.innerHeight;
Game.NUM_MASSES = 15;

Game.prototype.addMasses = function() {
  for(var i = 0; i < this.numMasses; i++){
    var newMass = new Mass(this.randomPos(), this);
    this.masses.push(newMass);
  }
};

Game.prototype.addMass = function(pos) {
  var newMass = new Mass(pos, this);
  this.masses.push(newMass);
};

Game.prototype.populateMasses = function() {
  for(var i = 0; i < 15; i++){
    var newMass = new Mass(this.randomPos(), this);
    this.masses.push(newMass);
  }
};

Game.prototype.resetAll = function() {
  this.masses = [];
  this.addMasses();
  this.ship.reset();
};

Game.prototype.resetShip = function() {
  this.ship.reset();
};

Game.prototype.clearMasses = function() {
  this.masses = [];
};

Game.prototype.randomPos = function () {
  var x = (Math.random() * this.dimX);
  var y = (Math.random() * this.dimY);
  return [x,y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.dimX, this.dimY);
  this.allObjects().forEach(function(obj) {
    obj.draw(ctx);
  });
};

Game.prototype.updateObjects = function() {
  var masses = this.allObjects();
  for (var i = 0; i < masses.length; i++){
    for (var j = 0; j < masses.length; j++){
      var mainObj = masses[i];
      var otherObj = masses[j];

      if (mainObj !== otherObj && mainObj !== this.ship){
        var distance = Util.distance(mainObj, otherObj);

        // Main Object 

        // main position coordinates
        var mainX = mainObj.pos[0];
        var mainY = mainObj.pos[1];
        // main velocity vectors
        var main_dx = mainObj.vel[0];
        var main_dy = mainObj.vel[1];


        // Other Object

        // other position coordinates
        var otherX = otherObj.pos[0];
        var otherY = otherObj.pos[1];


        // Main's Distance to Other Object
        var mainDistX = mainX - otherX;
        var mainDistY = mainY - otherY;

        // Sin/Cos Theta
        var sinTheta = mainDistY / distance;
        var cosTheta = mainDistX / distance;

        // Acceleration
        var accel = (otherObj.size) / Math.pow(distance,2);
        
        // Gravitational Velocity Vectors
        var grav_dx = accel * cosTheta;
        var grav_dy = accel * sinTheta;



        // Sum Vectors (max velocity: 5)

        if (this.antiGravity == true){
          mainObj.vel[0] += grav_dx;
          mainObj.vel[1] += grav_dy;
        } else {
          mainObj.vel[0] -= grav_dx;
          mainObj.vel[1] -= grav_dy;
        }

        if (mainObj.vel[0] > 5 || mainObj.vel[0] < -5){
          if (mainObj.vel[0] > 0){
            mainObj.vel[0] = 5;
          } else{
            mainObj.vel[0] = -5;
          }
        }
        if (mainObj.vel[1] > 5 || mainObj.vel[1] < -5){
          if (mainObj.vel[1] > 0){
            mainObj.vel[1] = 5;
          } else {
            mainObj.vel[1] = -5;
          }
        }

        mainObj.move();

        // if object is ship, ignore gravitional pull of other objects
      } else if (mainObj == this.ship) {
        mainObj.move();
      }
    }
  }
};

Game.prototype.wrap = function (pos) {
  var posArray = pos;
  if (pos[0] < -50){
    posArray[0] = this.dimX + 50;
  } else if (pos[0] > this.dimX + 50) {
    posArray[0] = -50;
  } else if (pos[1] < -50){
    posArray[1] = this.dimY + 50;
  } else if (pos[1] > this.dimY + 50) {
    posArray[1] = -50;
  }
  return posArray;
};

Game.prototype.checkCollisions = function () {
  var current = this;
  this.allObjects().forEach(function(obj1) {
    current.allObjects().forEach(function(obj2) {
      if(obj1 !== obj2 && obj1.isCollidedWith(obj2)){
        obj1.collideWith(obj2);
      }
    });
  });
};

Game.prototype.removeMass = function (mass) {
  var idx = this.masses.indexOf(mass);
  this.masses.splice(idx, 1);
};


Game.prototype.step = function() {
  this.updateObjects();
  this.checkCollisions();
};


Game.prototype.allObjects = function () {
  return this.masses.concat([this.ship]);
};

module.exports = Game;
