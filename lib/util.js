var Util = window.Util = function()  {};
function Surrogate() {}

Util.inherits = function(ChildClass, ParentClass) {
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
  ChildClass.prototype.constructor = ChildClass;
};

Util.randomVec = function() {
  var dx = (Math.random() * 0.25) - 0.25;
  var dy = (Math.random() * 0.25) - 0.25;
  console.log(dx + "," + dy);
  return [dx, dy];
};

Util.distance = function(startObj, endObj) {
  var startPos = startObj.pos;
  var endPos = endObj.pos;

  return Math.sqrt(Math.pow((startPos[0] - endPos[0]), 2) +
         Math.pow((startPos[1] - endPos[1]), 2));
};

module.exports = Util;
