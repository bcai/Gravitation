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