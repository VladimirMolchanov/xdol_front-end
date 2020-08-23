import $ from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import inputSelect from './input-select';
import inputFile from './input-file';
import 'owl.carousel';
import './line';

function padNum(num) {
    return num.toString().padStart(2,0);
}

$(document).ready(function(){
    var owl = $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        items:1,
        stagePadding: 20,
        autoplay:true,
        autoplayTimeout:5000,
        responsive: {
            720: {
                stagePadding: 10,
            },
            992: {
                stagePadding: 150,
            },
            1200: {
                stagePadding: 160,
            },
            1300: {
                stagePadding: 180,
            },
            1400: {
                stagePadding: 200,
            },
            1500: {
                stagePadding: 220,
            },
            1600: {
                stagePadding: 240,
            },
            1700: {
                stagePadding: 360,
            },
            1800: {
                stagePadding: 380,
            },
        },
        // onChange: (event) => {
        //     var dots = $(".owl-custom-dots")
        //     dots.find(".after").css("transition", "all .3s")
        // },    
        onInitialized: (event) => {
            var element   = event.target
            var items     = event.item.count;
            var nav = $(element).find(".owl-nav")
            var prev = nav.find(".owl-prev")
            $(prev).after("<div class='text-positions'><span class='curent'>01 </span>/ 06<span><span></div>")
            var dots = $(".owl-custom-dots")
            var current = dots.children()
            $(current[0]).addClass("active")

            // dots.find(".after").css("width", (1) * (100/(items-1))  + "%")
            // dots.find(".after").css("height", (1) * (100/(items-1))  + "%")
            // dots.find(".after").css("transition", "all 5s")
            dots.find(".after").stop().animate({
                "width": ((1) * (100/(items-1))) + 1  + "%", 
                "height": ((1) * (100/(items-1))) + 1  + "%"
            }, 6500)
        },
        onTranslate: (event) => {
            var element = event.target
            var items     = event.item.count;
            var menuCounterThis = $(element).find(".curent")
            var count = ++event.page.index
            var dots = $(".owl-custom-dots")
            var current = dots.children()
            current.each(function() {
                $(this).removeClass("active")
            });
            for(let i=0; i < count; i++) {
                $(current[i]).addClass("active")
            }
            dots.find(".after").stop()
            // dots.find(".after").css("transition", "all .3s")
            // dots.find(".after").stop().animate({
            //     "width": (count-1) * (100/(items-1))  + "%", 
            //     "height": (count-1) * (100/(items-1))  + "%"
            // }, 300)
            // dots.find(".after").css("height", (count-1) * (100/(items-1))  + "%")
            // if(count == 1) 
            //     dots.find(".after").css("transition", "all 0s")
            // else
            //     dots.find(".after").css("transition", "all .3s")
            if(count == 1) 
                dots.find(".after").stop().animate({
                    "width": ((count-1) * (100/(items-1))) + 1  + "%", 
                    "height": ((count-1) * (100/(items-1))) + 1  + "%"
                }, 0)
            else
                dots.find(".after").stop().animate({
                    "width": ((count-1) * (100/(items-1))) + 1  + "%", 
                    "height": ((count-1) * (100/(items-1))) + 1  + "%"
                }, 300)
        },
        onTranslated: (event) => {
            console.log("onTranslated")
            var element = event.target
            var items     = event.item.count;
            var menuCounterThis = $(element).find(".curent")
            // var menuCloned = $(this).find('.cloned').length // Количество клонированных элементов
            // var menuIndex = event.item.index // Номер текущего слайда
            // var menuCount = event.item.count // Общее количество слайдов (без клонированных)
            // if ( menuIndex > menuCount ) {
            //     menuCounterThis.text( padNum(menuIndex - menuCloned + ( menuCloned - menuCount ))  );
            // } else {
            //     menuCounterThis.text( padNum(menuIndex) );
            // }

            // menuCounterTotal.text( padNum(menuCount) );
            var count = ++event.page.index
            var dots = $(".owl-custom-dots")
            var current = dots.children()
            menuCounterThis.text( padNum(count) + " " );
            current.each(function() {
                $(this).removeClass("current")
            });
            $(current[count]).addClass("current")
            
            
            // dots.find(".after").css("width", (count) * (100/(items-1))  + "%")
            // dots.find(".after").css("height", (count) * (100/(items-1))  + "%")
            // dots.find(".after").css("transition", "all 8s")
            dots.find(".after").stop().animate({
                "width": ((count-1) * (100/(items-1))) + 1 + "%", 
                "height": ((count-1) * (100/(items-1))) + 1  + "%"
            }, 0)
            dots.find(".after").stop().animate({
                "width": ((count) * (100/(items-1))) + 1 + "%", 
                "height": ((count) * (100/(items-1))) + 1  + "%"
            }, 6500)
        }
    });

    $('.owl-custom-dots').on('click', 'button', function(e) {
        owl.trigger('to.owl.carousel', [jQuery(this).index(), 300]);
    });
});



$( document ).ready(function(){
    $('.main-content__mini-project--content-list-item').each(function() {
        let id = $(this).attr("id")
        $("#"+id).on("mouseover", function(e) {
            console.log( $(this).data("project") )
            $( "#"+$(this).data("project") ).addClass("open")
        })
        $("#"+id).on("mouseout", function(e) {
            console.log( $(this).data("project") )
            $( "#"+$(this).data("project") ).removeClass("open")
        })
    });    
});