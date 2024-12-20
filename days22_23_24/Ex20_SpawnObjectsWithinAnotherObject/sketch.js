// create a variable for A-Frame world
let world;

// references to our markers (which are defined in the HTML document)
let markerHiro;

// a static container that represents some graphics that we always want visible to our users
let staticContainer1;
let staticContainer2;

// a ball indicator
let ball;

// cooldown indicator
let cooldown = 0;

function setup() {
    world = new AFrameP5AR.World("ARScene");

    // grab a reference to our marker in the HTML document
    markerHiro = world.getMarker("hiro");

    // create our ball
    ball = new AFrameP5AR.Sphere({
        x: 0, y: 0.5, z: 0,
        red: 255, green: 0, blue: 0,
        radius: 0.25
    });

    // add the ball to the marker
    markerHiro.addChild(ball);


    // create two static containers that will always be visible to the user even if not marker is being detected
    staticContainer1 = new AFrameP5AR.Container3D({
        x: -2, y: 0, z: -5
    });
    staticContainer2 = new AFrameP5AR.Container3D({
        x: 2, y: 0, z: -5
    });


    // add some geometry to the static container
    staticContainer1.addChild(new AFrameP5AR.Box({
        x: 0, y: 0, z: 0,
        red: 0, green: 255, blue: 0,
        opacity: 0.5,
        width: 0.5, height: 0.5, depth: 0.5
    }));

    // add some geometry to the static container
    staticContainer2.addChild(new AFrameP5AR.Box({
        x: 0, y: 0, z: 0,
        red: 0, green: 0, blue: 255,
        opacity: 0.5,
        width: 0.5, height: 0.5, depth: 0.5
    }));


    // add the static container to the world
    world.scene.appendChild(staticContainer1.tag);
    world.scene.appendChild(staticContainer2.tag);
}


function draw() {

    if (markerHiro.isVisible()) {

        // which static container are we closest to?
        let markerPosition = new THREE.Vector3().setFromMatrixPosition(markerHiro.tag.object3D.matrixWorld);
        let s1Position = new THREE.Vector3().setFromMatrixPosition(staticContainer1.tag.object3D.matrixWorld);
        let s2Position = new THREE.Vector3().setFromMatrixPosition(staticContainer2.tag.object3D.matrixWorld);

        // staticContainer1
        if (cooldown <= 0 && dist(markerPosition.x, markerPosition.y, s1Position.x, s1Position.y) < 1) {

            // convert to local coordinates within staticContainer1
            let p = new THREE.Vector3();
            p.setFromMatrixPosition(ball.tag.object3D.matrixWorld);
            p = staticContainer1.tag.object3D.worldToLocal(p);

            let temp = new AFrameP5AR.Sphere({
                x: p.x, y: p.y, z: p.z,
                radius: 0.05,
                red: random(255), green: random(255), blue: random(255)
            })
            staticContainer1.addChild(temp);

            // indicate that we are in 'cooldown' mode
            cooldown = 60;
        }

        // staticContainer2
        if (cooldown <= 0 && dist(markerPosition.x, markerPosition.y, s2Position.x, s2Position.y) < 1) {

            // convert to local coordinates within staticContainer2
            let p = new THREE.Vector3();
            p.setFromMatrixPosition(ball.tag.object3D.matrixWorld);
            p = staticContainer2.tag.object3D.worldToLocal(p);

            let temp = new AFrameP5AR.Box({
                x: p.x, y: p.y, z: p.z,
                width: 0.1, height: 0.1, depth: 0.1,
                red: random(255), green: random(255), blue: random(255)
            })
            staticContainer2.addChild(temp);

            // indicate that we are in 'cooldown' mode
            cooldown = 60;
        }

    }

    staticContainer1.spinY(1);
    staticContainer2.spinY(1);

    // process cooldown counter
    cooldown--;
    if (cooldown < 0) {
        cooldown = 0;
    }
}
