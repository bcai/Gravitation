var Mass = window.Mass = function(pos, game) {
  var radius = (Math.random() * 14) + 7;
  var size = radius * 5;
  var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
  console.log(randomColor);
  MovingObject.call(this, pos,
                    Util.randomVec(),
                    radius,
                    size,
                    randomColor, game);
};

Util.inherits(Mass, MovingObject);

module.exports = Mass;
