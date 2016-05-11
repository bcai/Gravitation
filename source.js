var Util = require('./lib/util.js');
var MovingObject = require('./lib/movingObject.js');
var Mass = require('./lib/mass.js');
var Ship = require('./lib/ship.js');
var Game = require('./lib/game.js');
var GameView = require('./lib/gameView.js');


    var canvas = document.getElementById("game-canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    var context = canvas.getContext("2d");

    var newGame = new Game();
    var gameView = new GameView(newGame, context);

    gameView.start();


    // Clear Button
    var clearButton = document.createElement("Button");
    clearButton.className = 'clear';
    var clearText = document.createTextNode("Clear");     
    clearButton.appendChild(clearText); 
    document.body.appendChild(clearButton);
    clearButton.addEventListener('click', function(e){
      newGame.clearMasses();
    }); 

    // Reset Button
    var resetButton = document.createElement("Button");
    resetButton.className = 'reset';
    var resetText = document.createTextNode("Reset");     
    resetButton.appendChild(resetText); 
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', function(e){
      newGame.resetMasses();
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

    // var shipRadius = newGame.ship.radius;
    // var radiusCount = document.createTextNode("Mass: " + shipRadius);
    // document.body.appendChild(radiusCount);