(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('GeneralCtrl', GeneralCtrl);

  GeneralCtrl.$inject = [];

  /* @ngInject */
  function GeneralCtrl() {
    var vm = this;

    vm.title = 'GeneralCtrl';
    vm.isMobile = isMobile;

    // this.$onInit = function () {
    //   checkMobile();
    // };


    ////////////////


    function checkMobile() {

      if (vm.isMobile.any) {
        vm.parallaxSpeed = 1;
      } else {
        vm.parallaxSpeed = 0.3;
      }
    } // checkMobile


  } // GeneralCtrl

})();

