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
