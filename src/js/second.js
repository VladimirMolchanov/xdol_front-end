// import $ from 'jquery';
// import popper from 'popper.js';
// import bootstrap from 'bootstrap';

// import inputSelect from './input-select';
// import inputFile from './input-file';

// import anime from 'animejs/lib/anime.es.js';

// $(document).ready(function(){
//     var tl = null
//     $(".default-link").on("mouseover", function(e) {
//         // $( this ).addClass("hover")
        
//         var targets = "." + $( this ).data("css") + " .step"
        
//         console.log(targets)

//         tl = anime.timeline({
//             targets: targets,
//             easing: 'easeOutExpo',
//             delay: function(el, i) { return i * 200 },
//             duration: 350,
//             loop: true,
//             autoplay: false,
//             endDelay: -200
//         });
        
//         tl
//         .add({
//             translateX: -60,
//         })
//         .add({
//             translateX: 60,
//             duration: 0
//         })
//         .add({
//             translateX: 0,
//         })
//         tl.play()

//         console.log( tl )
//     })
//     $(".default-link").on("mouseout", function(e) {
//         tl.pause()
//         tl.reset()
//     })
// });