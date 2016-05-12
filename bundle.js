/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var MovingObject = __webpack_require__(2);
	var Mass = __webpack_require__(3);
	var Ship = __webpack_require__(4);
	var Game = __webpack_require__(5);
	var GameView = __webpack_require__(6);
	
	
	    var canvas = document.getElementById("game-canvas");
	    canvas.height = window.innerHeight;
	    canvas.width = window.innerWidth;
	    var context = canvas.getContext("2d");
	
	    var newGame = new Game();
	    var gameView = new GameView(newGame, context);
	
	    var resizeCanvas = function() {
	      canvas.width = window.innerWidth;
	      canvas.height = window.innerHeight;
	      newGame.dimX = window.innerWidth;
	      newGame.dimY = window.innerHeight; 
	      newGame.draw(context);
	    };
	    
	    window.addEventListener('resize', resizeCanvas, false);
	
	    gameView.start();
	
	
	    
	    // Reset-All Button
	    var resetAllButton = document.createElement("Button");
	    resetAllButton.id = 'reset-all';
	    resetAllButton.className = 'button';
	    var resetAllText = document.createTextNode("All");     
	    resetAllButton.appendChild(resetAllText); 
	    document.body.appendChild(resetAllButton);
	    resetAllButton.addEventListener('click', function(e){
	      newGame.resetAll();
	    });
	
	    // Reset-Ship Button
	    var resetShipButton = document.createElement("Button");
	    resetShipButton.id = 'reset-ship';
	    resetShipButton.className = 'button';
	    var resetShipText = document.createTextNode("Mass");     
	    resetShipButton.appendChild(resetShipText); 
	    document.body.appendChild(resetShipButton);
	    resetShipButton.addEventListener('click', function(e){
	      newGame.resetShip();
	    });
	
	
	    // Populate
	    var populateButton = document.createElement("Button");
	    populateButton.id = 'populate';
	    populateButton.className = "button";
	    var populateText = document.createTextNode("Populate");     
	    populateButton.appendChild(populateText); 
	    document.body.appendChild(populateButton);
	    populateButton.addEventListener('click', function(e){
	      newGame.populateMasses();
	    });
	
	    // Clear Button
	    var clearButton = document.createElement("Button");
	    clearButton.id = 'clear';
	    clearButton.className = "button";
	    var clearText = document.createTextNode("Clear");     
	    clearButton.appendChild(clearText); 
	    document.body.appendChild(clearButton);
	    clearButton.addEventListener('click', function(e){
	      newGame.clearMasses();
	    }); 
	
	
	    // AntiGravity
	    var antiGButton = document.createElement("Button");
	    antiGButton.id = 'anti-gravity';
	    var antiGText = document.createTextNode("OFF");     
	    antiGButton.appendChild(antiGText); 
	    document.body.appendChild(antiGButton);
	    antiGButton.addEventListener('click', function(e){
	      if (e.currentTarget.textContent == "OFF"){
	        newGame.antiGravity = true;
	        this.textContent = "ON";
	      } else {
	        newGame.antiGravity = false;
	        this.textContent = "OFF";
	      }
	    });
	
	    document.body.addEventListener("click", function(e){
	      var posX = event.clientX;
	      var posY = event.clientY;
	      newGame.addMass([posX,posY]);
	    });

/***/ },
/* 1 */
/***/ function(module, exports) {

	var Util = function()  {};
	function Surrogate() {}
	
	Util.inherits = function(ChildClass, ParentClass) {
	  Surrogate.prototype = ParentClass.prototype;
	  ChildClass.prototype = new Surrogate();
	  ChildClass.prototype.constructor = ChildClass;
	};
	
	Util.randomVec = function() {
	  var dx = (Math.random() * 2) - 2;
	  var dy = (Math.random() * 2) - 2;
	  return [dx, dy];
	};
	
	Util.distance = function(startObj, endObj) {
	  var startPos = startObj.pos;
	  var endPos = endObj.pos;
	
	  return Math.sqrt(Math.pow((startPos[0] - endPos[0]), 2) +
	         Math.pow((startPos[1] - endPos[1]), 2));
	};
	
	module.exports = Util;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var MovingObject = __webpack_require__(2);
	
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var MovingObject = __webpack_require__(2);
	
	
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Mass = __webpack_require__(3);
	var Ship = __webpack_require__(4);
	var Util = __webpack_require__(1);
	
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


/***/ },
/* 6 */
/***/ function(module, exports) {

	var GameView = function(game, ctx) {
	  this.game = game;
	  this.ctx = ctx;
	  this.ship = this.game.ship;
	};
	
	GameView.MOVES = {
	  "up":    [ 0, -0.1],
	  "left":  [-0.1,  0],
	  "down":  [ 0,  0.1],
	  "right": [ 0.1,  0],
	};
	
	GameView.prototype.start = function(){
	  this.bindKeyHandlers();
	
	  setInterval(this.game.draw.bind(this.game), 20, this.ctx);
	  setInterval(this.game.step.bind(this.game), 20);
	};
	
	GameView.prototype.bindKeyHandlers = function () {
	  var ship = this.ship;
	
	  Object.keys(GameView.MOVES).forEach(function (coord) {
	    var move = GameView.MOVES[coord];
	    key(coord, function () { 
	      var max = false;
	      if( ship.vel[0] + move[0] > 1.55 || ship.vel[0] + move[0] < -1.55){
	        if (ship.vel[0] > 0){
	          ship.vel = [1.55, ship.vel[1]];
	        } else {
	          ship.vel = [-1.55, ship.vel[1]];
	        }
	        max = true;
	      }
	      if (ship.vel[1] + move[1] > 1.55 || ship.vel[1] + move[1] < -1.55){
	        if (ship.vel[1] > 0) {
	          ship.vel = [ship.vel[0], 1.55];
	        } else {
	          ship.vel = [ship.vel[0], -1.55];
	        }
	        max = true;
	      }
	      if (max !== true){
	        ship.power(move);
	      }
	    });
	  });
	
	};
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map