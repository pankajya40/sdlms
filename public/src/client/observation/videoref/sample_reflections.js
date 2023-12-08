'use strict';

/* globals define */

define('forum/observation/videoref/sample_reflections', [
    'https://owlcarousel2.github.io/OwlCarousel2/assets/owlcarousel/owl.carousel.js',
], function (api) {
	var sample_reflections = {};

    sample_reflections.init = function () {

        $('.example-reflections-carousel').owlCarousel({
            items:1,
            rewind: true,
            margin:10,
            autoplay:true,
            autoplayTimeout:4000,
            autoplayHoverPause:true,
            nav: true,
            autoHeight: true,
        });
    }

    return sample_reflections;
})