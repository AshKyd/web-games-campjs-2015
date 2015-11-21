(function() {

    var canvas = document.querySelector('.physics canvas');
    canvas.width = window.innerWidth * 0.5;
    canvas.height = canvas.width * 0.66;
    var ctx = canvas.getContext('2d');

    var physics = new Physics();

    var radius = 50;
    var mass = 25;

    var x1 = canvas.width * 0.25;
    var x2 = canvas.width * 0.75;
    var y = canvas.height / 2;

    var a = physics.makeParticle(mass, x1, y);
    var b = physics.makeParticle(mass, x2, y);

    // Create an attraction between the particles.

    // The strength of the bond between two particles.
    var strength = 50000;

    // The proximity at which the attraction will be enabled.
    var minDistance = canvas.width;

    // Make the attraction and add it to physics
    var attraction = physics.makeAttraction(a, b, strength, minDistance);
    var cubeSize = 80;

    var update = {};

    var render = function() {

        if(canvas.class !== 'active'){
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var x1 = a.position.x;
        var y1 = a.position.y;

        var x2 = b.position.x;
        var y2 = b.position.y;

        drawCube(
          x1,
          y1,
          cubeSize, // x1
          cubeSize, // x2
          cubeSize, // y
          '#ff8888', // color
          ctx
        );

        drawCube(
          x2,
          y2,
          cubeSize, // x1
          cubeSize, // x2
          cubeSize, // y
          '#8888ff', // color
          ctx
        );

        if (b.resting()) {
          a.position.set(x1, y);
          b.position.set(x2, y);
        }

    };

    // Bind the render function to when physics updates.
    physics.onUpdate(render);

    // Render a posterframe.
    render();

    physics.toggle();

    // store our physics object on the canvas so we can access it later
    canvas.physics = physics;

})();
