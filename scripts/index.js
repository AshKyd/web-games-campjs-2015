addEventListener('load', function(){
    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        keyboard: true,
        overview: true,
        center: true,
        transition: 'fade',
        backgroundTransition: 'zoom',
        dependencies: [
            {
                src: 'https://cdnjs.cloudflare.com/ajax/libs/reveal.js/3.1.0/plugin/highlight/highlight.min.js',
                async: true,
                callback: function() {
                    hljs.initHighlighting();
                }
            }
        ]
    });

    Reveal.addEventListener( 'slidechanged', function( event ) {
        // Play video
        var video = event.currentSlide.querySelector('video');
        if(video){
            video.play();
        }

        var canvases = document.querySelectorAll('canvas');
        Object.keys(canvases).forEach(function(i){
            canvases[i].class = 'inactive';
        });

        var thisCanvas = event.currentSlide.querySelector('canvas');
        if(thisCanvas){
            thisCanvas.class = 'active';
        }
    });
});
