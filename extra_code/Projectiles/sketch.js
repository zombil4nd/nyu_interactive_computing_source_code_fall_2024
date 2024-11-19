// variable to hold a reference to our A-Frame world
let world;

// array to hold our projectiles
let projectiles = [];

// array to hold our targets
let targets = [];

function setup() {
	// no canvas needed
	noCanvas();

	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new AFrameP5.World('VRScene');

	// show the target reticle so the user can aim (the standard cursor ring)
	world.showCursor();

	// make a floor for our world
	world.add( new AFrameP5.Plane({
		rotationX: -90,
		repeatX: 50,
		repeatY: 50,
		width: 100,
		height: 100
	}));

	// create a bunch of targets to try and hit
	for (let i = 0; i < 50; i++) {
		let temp = new AFrameP5.Sphere({
			x: random(-50, 50),
			y: random(10, 30),
			z: random(-50, 50),
			red: random(255),
			green: random(255),
			blue: random(255),
			radius: 1
		});
		world.add( temp );
		targets.push( temp );
	}
}

function draw() {
	// tell all projectiles to move
	for (let i = 0; i < projectiles.length; i++) {
		projectiles[i].move();

		// get WORLD position for this projectile
		let projectilePosition = projectiles[i].myCube.getWorldPosition();

		// did the projectile go off the screen? if so, just remove it and move into the next one
		if (projectilePosition.x > 50 || projectilePosition.x < -50 || projectilePosition.z > 50 || projectilePosition.z < -50) {
			world.remove(projectiles[i].myContainer);
			projectiles.splice(i, 1);
			i--;
			continue;
		}

		// otherwise check for collisions with our targets
		for (let j = 0; j < targets.length; j++) {

			// compute distance
			let d = dist(projectilePosition.x, projectilePosition.y, projectilePosition.z, targets[j].getX(), targets[j].getY(), targets[j].getZ());
			if (d < 2) {
				// hit!
				world.remove(targets[j]);
				targets.splice(j, 1);
				break;
			}
		}
	}
}

function keyPressed() {
	// time to create a projectile!
	let temp = new Projectile();
	projectiles.push( temp );
}


class Projectile {

	constructor() {
		// first, figure out where the user is so we know where to place our Projectile
		let userPosition = world.getUserPosition();

		// next, figure out how the user is currently rotated - this will allow us to
		// fire off our projectile along the user's line of sight
		let userRotation = world.getUserRotation();

		// next, construct an invisible container that is on top of the user and is rotated
		// in the same way as the user
		this.myContainer = new AFrameP5.Container3D({
			x: userPosition.x,
			y: userPosition.y,
			z: userPosition.z,
			rotationX: degrees(userRotation.x),
			rotationY: degrees(userRotation.y),
			rotationZ: degrees(userRotation.z)
		});
		world.add(this.myContainer);

		// now create an asset to serve as our projectile - we will place it at 0,0,0 inside since
		// we are going to put it inside of the invisible container (which is already at the right spot)
		this.myCube = new AFrameP5.Box({
			x:0,
			y:0,
			z:0,
			width:0.1,
			height:0.1,
			width:0.1,
			red:random(255),
			blue:random(255),
			green:random(255)
		});

		// add the assset to the container (not the world!)
		this.myContainer.addChild(this.myCube);
	}

	// our move function
	move() {
		// easy peasy - the projectile just moves along the z-axis by a certain amount
		// because it's been placed into a container that is already rotated correctly
		// we don't need to deal with any fancy math here
		this.myCube.nudge(0,0,-0.2);
	}
}
