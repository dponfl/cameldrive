(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .component('adminTestimonialsFilter', {
      controller: 'AdminTestimonialsCtrl',
      bindings: {
        showList: '=',
        langList: '='
      },
      templateUrl: 'templates/view/admin/testimonials_filter.html'
    });
})();
