$('document').ready(function() {
    var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    var swiperV = new Swiper('.swiper-container-v', {
        direction: 'vertical',
        spaceBetween: 500,
        pagination: {
            el: '.swiper-pagination-v',
            clickable: true,
        },
    });

    var socket = io();

    socket.on('covidAlert', function(msg) {
        console.log(msg)
    });

    socket.on('vegetables1', function(msg) {
        console.log(msg)
    });

    socket.on('vegetables2', function(msg) {
        console.log(msg)
    });

    socket.on('airQuality', function(msg) {
        console.log(msg)
    });

});