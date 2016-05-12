# Gravitation

[Gravitation live][github]

[github]: http://bcai.github.io/Gravitation/

Gravitation is a gravity simulation demo built purely on Javascript, utilizing Canvas rendering and Keymaster library for key handlers.

## Features & Implementation


### Vector Physics 

Gravitation makes use of the Universal Law of Gravitation to calculate all interactions between gravitational masses on the canvas. Using the position, velocity, and masses of two objects, the resulting velocity vectors of the masses can be calculated accounting for the attractive forces between the two elements given their distance to one another.

This calculation is calculated betweene every element existing on the canvas at a given time. 


Vector Math:

```javascript
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
```


### Canvas Rendering

The HTML `<canvas>` element is used to draw the gravitational objects in this simulator. The objects are redrawn and rendered every 20 milliseconds, resulting in the awesome animations that can be seen on the webpage.

The canvas itself will dynamically resize according to the size of the page, using a resize event listener.

Objects moving around the page must have collision detection. If the objects collide with one another, the larger mass will swallow up the smaller.

```javascript
MovingObject.prototype.isCollidedWith = function (otherObject) {
  var distance =  Util.distance(this, otherObject);
  var sumRadii = (this.radius * 0.175) + (otherObject.radius * 0.175);
  return (distance < sumRadii);
};

Mass.prototype.collideWith = function (otherObject) {
  if((this instanceof Mass) && (otherObject instanceof Mass)) {
    if (this.radius >= otherObject.radius){
      this.radius = Math.sqrt((Math.PI * Math.pow(this.radius, 2) + (Math.PI * Math.pow(otherObject.radius, 2))) / Math.PI);
      this.size += otherObject.size;
      this.game.removeMass(otherObject);
    }
  }
};
```

### User Interaction

Multiple buttons and toggles are available to the user to interact with the elements on the canvas.

The user can interact with a main element on the canvas, navigating via directional keys, and absorbing other objects in the process.

The `Reset All` button allows the user to reset all the elements on the canvas. `Reset Mass` resets the mass of the main element to a initial state of size 10.

The `Populate` button populates the canvas with an additional 15 elements.

The `Clear` button clears the canvas of all elements except the main element.

The `Anti-Gravity` button reverses the gravitational effects of all elements on the canvas. Instead of attracting, the elements will now repel one another.


```javascript
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
```


## Future Directions for the Project

In addition to the features already implemented, I plan to continue work on this project.  The next steps for Gravitation are outlined below.

### Orbiting Masses

A great implementation of this simulation would be to create masses that have a stable orbit around the main element. Making use of the Orbital Velocity Formula, if a user right-clicks the mouse, a resulting orbiting-element can be created.

### Masses with User-Specified Mass and Velocity

Instead of simply clicking on the page to generate an element, a user can create an element with a set mass and directional velocity with a click and drag of the mouse.