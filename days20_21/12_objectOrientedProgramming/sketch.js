// variable to hold a reference to our A-Frame world
let world;

// array to hold some particles
let particles = [];


function setup() {
	// no canvas needed
	noCanvas();

	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new AFrameP5.World('VRScene');

	// set the world background color
	world.setBackground(0, 0, 0);

	// create a plane to serve as our "ground"
	let g = new AFrameP5.Plane({
						x:0, y:0, z:0,
						width:100, height:100,
						asset: 'stone',
						repeatX: 100,
						repeatY: 100,
						rotationX:-90
					   });

	// add the plane to our world
	world.add(g);
}

function draw() {

	// always create a new particle
	let temp = new Particle(0, 0, -5);

	// add to array
	particles.push( temp );

	// draw all particles
	for (let i = 0; i < particles.length; i++) {
		let result = particles[i].move();
		if (result == "gone") {
			particles.splice(i, 1);
			i-=1;
		}
	}

}

// class to describe a particle's behavior
class Particle {

	constructor(x,y,z) {

		// construct a new Box that lives at this position
		this.myBox = new AFrameP5.Sphere({
								x:x, y:y, z:z,
								red: random(255), green:random(255), blue:random(255),
								radius: 0.5
		});

		// add the box to the world
		world.add(this.myBox);

		// keep track of an offset in Perlin noise space
		this.xOffset = random(1000);
		this.zOffset = random(2000, 3000);
	}

	// function to move our box
	move() {
		// compute how the particle should move
		// the particle should always move up by a small amount
		let yMovement = 0.01;

		// the particle should randomly move in the x & z directions
		let xMovement = map( noise(this.xOffset), 0, 1, -0.05, 0.05);
		let zMovement = map( noise(this.zOffset), 0, 1, -0.05, 0.05);

		// update our poistions in perlin noise space
		this.xOffset += 0.01;
		this.yOffset += 0.01;

		// set the position of our box (using the 'nudge' method)
		this.myBox.nudge(xMovement, yMovement, zMovement);

		// make the boxes shrink a little bit
		let boxScale = this.myBox.getScale();
		this.myBox.setScale( boxScale.x-0.005, boxScale.y-0.005, boxScale.z-0.005);

		// if we get too small we need to indicate that this box is now no longer viable
		if (boxScale.x <= 0) {
			// remove the box from the world
			world.remove(this.myBox);
			return "gone";
		}
		else {
			return "ok";
		}
	}
}
