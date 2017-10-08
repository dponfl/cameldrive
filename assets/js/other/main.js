"use strict";

$(document).ready(function() {

  $( "body" ).on( 'click', '.link-and-scroll', function(event) {

    $('html, body').animate({
      scrollTop: 0
    }, 900);
  });


  $(".navbar a, footer a").on('click', function(event) {

    $('html, body').animate({
      scrollTop: 0
    }, 900);

    $('.navbar-collapse').removeClass('in');
  });

});
