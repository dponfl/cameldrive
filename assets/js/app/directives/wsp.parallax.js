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
      p.css("background-image", "url(" + scope.backgroundUrl + ")");
      $document.on("scroll", function() {
        var scrollTop = $document.scrollTop();
        var top = p.position().top;
        var height = p.height();
        if (top < scrollTop && top + height > scrollTop) {
          p.css({"background-position-y":  0.5 * (scrollTop) + "px"});
          console.log("Background position:", p.css("background-position-y"));
        }
        console.log("Top:", top);
        console.log("Height", height);
        console.log("ScrollTop:", scrollTop);
      });
    } // _link

  } // wspParallax
})();

