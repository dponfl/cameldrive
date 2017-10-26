(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('FooterCtrl', FooterCtrl);

  FooterCtrl.$inject = ['GeneralConfigService', 'S_ReqService', '$rootScope', '$scope', '$modal', '$log',
    'lodash', 'toaster'];

  /* @ngInject */
  function FooterCtrl(GeneralConfigService, S_ReqService, $rootScope, $scope, $modal, $log,
                      lodash, toaster) {
    var vm = this;
    vm.title = 'FooterCtrl';
    var _ = lodash;
    var __=GeneralConfigService;

    activate();

    ////////////////

    function activate() {

      vm.navMeny = [
        {
          href: 'home',
          text: 'NAV_HOME',
        },
        {
          href: 'conditions',
          text: 'NAV_CONDITIONS',
        },
        {
          href: 'discount',
          text: 'NAV_DISCOUNT',
        },

      ];

      vm.subscription = [
        {
          href: 'http://www.youtube.com',
          text: 'FOOTER_SUBSCRIBE_YOUTUBE',
        },
        {
          href: 'http://www.facebook.com',
          text: 'FOOTER_SUBSCRIBE_FACEBOOK',
        },
        {
          href: 'http://www.twitter.com',
          text: 'FOOTER_SUBSCRIBE_TWEETER',
        },
        {
          href: 'http://plus.google.com',
          text: 'FOOTER_SUBSCRIBE_GOOGLEPLUS',
        },
      ];

      vm.developer = {
          href: 'http://www.webstudiopro.info',
          text: 'WebStudioPro',
        };

    } // activate

  }

})();

