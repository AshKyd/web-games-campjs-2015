(function(){
    // Set up our canvas
    var canvas = document.querySelector('.blocks canvas');
    canvas.width = window.innerWidth*0.5;
    canvas.height = canvas.width*0.66;
    var ctx = canvas.getContext('2d');

    var green = '#84C171';

    var cubes = [
        [1, 2.0,1,1,1,.7,'#C8AF9E'],
        [1, 1.3,1,1,1,.3,'#7DD17D'],
        [1, 0.5,.1,.1,.1,.1,'#DFA656'],
        [1,0.45,.3,.3,.3,.05,green],
        [1,0.35,.2,.2,.2,.05,green],
        [1,0.25,.1,.1,.1,.05,green],
    ];

    var cubeSize = 150;

    // Animation function
    function draw(){
        if(canvas.class !== 'active'){
            return requestAnimationFrame(draw);
        }
      // clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Wobble the cube using a sine wave
      var wobble = 1 + Math.max(Math.sin(Date.now()/250), 0)/5;

      // draw the cube
      cubes.forEach(function(cube){
          drawCube(
            cube[0] * canvas.width/2,
            cube[1] * cubeSize * wobble,
            cube[3] * cubeSize, // x1
            cube[4] * cubeSize, // x2
            cube[5] * cubeSize, // y
            cube[6], // color
            ctx
          );
      });

      requestAnimationFrame(draw);
    }
    draw();
})();
