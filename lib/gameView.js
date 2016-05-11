var GameView = window.GameView = function(game, ctx) {
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
  // setInterval(this.game.moveObjects, 20);
  setInterval(this.game.draw.bind(this.game), 20, this.ctx);
  setInterval(this.game.step.bind(this.game), 20);
};

GameView.prototype.bindKeyHandlers = function () {
  var ship = this.ship;

  Object.keys(GameView.MOVES).forEach(function (coord) {
    var move = GameView.MOVES[coord];
    key(coord, function () { 
      var max = false;
      if( ship.vel[0] + move[0] > 5 || ship.vel[0] + move[0] < -5){
        if (ship.vel[0] > 0){
          ship.vel = [5, ship.vel[1]];
        } else {
          ship.vel = [-5, ship.vel[1]];
        }
        max = true;
        console.log("max_x: " + ship.vel);
      }
      if (ship.vel[1] + move[1] > 5 || ship.vel[1] + move[1] < -5){
        if (ship.vel[1] > 0) {
          ship.vel = [ship.vel[0], 5];
        } else {
          ship.vel = [ship.vel[0], -5];
        }
        max = true;
        console.log("max_y: " + ship.vel);
      }
      if (max !== true){
        ship.power(move);
        console.log("increase: " + ship.vel);
      }
    });
  });

  // key('left', function() {that.game.ship.power([-10,0])});
  // key('right', function() {that.game.ship.power([10,0])});
  // key('up', function() {that.game.ship.power([0,-10])});
  // key('down', function() {that.game.ship.power([0,10])});

};

module.exports = GameView;
