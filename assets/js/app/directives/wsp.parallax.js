(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .directive('wspParallax', wspParallax);

  wspParallax.$inject = ['$document'];

  /* @ngInject */
  function wspParallax($document) {
    var directive = {
      restrict: "AE",
      scope: {
        backgroundUrl: "<"
      },
      transclude: true,
      template: "<div class='wsp-parallax'><div class='wsp-content'><ng-transclude></ng-transclude></div></div>",
      link: _link,
    };
    return directive;

    function _link(scope, el, attrs) {
      console.log('wspParallax, _link, scope:');
      console.dir(scope);
      var p = el.find(".wsp-parallax");
      var initialTop = p.position().top;
      var initialScrollTop = $document.scrollTop();
      var initialHeight = p.height();
      var initialBackgroudPosition = p.css("background-position-y")
      console.log("Initial Top:", initialTop);
      console.log("Initial Height", initialHeight);
      console.log("Initial ScrollTop:", initialScrollTop);
      console.log('Initial position y:', p.css("background-position-y"));
      console.log('initialBackgroudPosition:', initialBackgroudPosition);
      p.css("background-image", "url(" + scope.backgroundUrl + ")");
      // p.css({"background-position-y":  -(initialTop + initialHeight) * 0.5 + "px"});
      $document.on("scroll", function() {
        var scrollTop = $document.scrollTop();
        // var top = p.position().top;
        // var height = p.height();
        // if (top < scrollTop && top + height > scrollTop) {
        if (scrollTop == 0) {
          p.css({"background-position-y":  -(initialTop + initialHeight) * 0.5 + "px"});
        } else {
          p.css({"background-position-y":  0.5 * (scrollTop - initialTop - initialHeight) + "px"});
        }

          console.log("Background position:", p.css("background-position-y"));
        // }
        // console.log("Top:", top);
        // console.log("Height", height);
        console.log("ScrollTop:", scrollTop);
      });
    } // _link

  } // wspParallax
})();

