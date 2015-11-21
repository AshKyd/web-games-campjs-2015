(function() {
    // Set up our canvas
    var canvas = document.querySelector('.pathfinding canvas');
    canvas.width = window.innerWidth * .5;
    canvas.height = canvas.width * .66;
    var ctx = canvas.getContext('2d');

    function getIsometricPos(x, y, tileWidth) {
        return [
            (x - y) * (tileWidth / 2), (x + y) * (tileWidth / 4)
        ];
    }


    // Animation function
    function draw() {
        if(canvas.class !== 'active'){
            return requestAnimationFrame(draw);
        }

        var grid = new PF.Grid(10, 10);

        for (var i = 0; i < 10; i++) {
            var x = Math.round(Math.random() * 9);
            var y = Math.round(Math.random() * 9);
            grid.setWalkableAt(x, y, false);
        }

        var finder = new PF.AStarFinder();
        var path = finder.findPath(0, 0, 9, 9, grid);
        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var cubeSize = canvas.width / 30;

        grid.nodes.forEach(function(row, x) {
            row.forEach(function(col, y) {
                var pos = getIsometricPos(x, y, cubeSize * 2);
                var color = (x + y) % 2 === 0 ? '#00ff00' : '#66ff66';
                if (col.walkable === false) {
                    color = '#333333';
                }

                // Is this point in the path?
                // Todo: make this more efficient.
                path.forEach(function(point) {
                    if (point[0] === y && point[1] === x) {
                        color = '#8888ff';
                    }
                });

                drawCube(
                    canvas.width / 2 + pos[0],
                    canvas.height / 4 + pos[1],
                    cubeSize,
                    cubeSize,
                    cubeSize * (col.walkable ? 1 : 1.5),
                    color,
                    ctx
                );
            });
        });


        setTimeout(draw, 2000);
    }
    draw();
})();
