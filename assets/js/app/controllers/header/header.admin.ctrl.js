(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('HeaderAdminCtrl', HeaderAdminCtrl);

  HeaderAdminCtrl.$inject = ['GeneralConfigService', '$translate', '$log', 'lodash'];

  /* @ngInject */
  function HeaderAdminCtrl(GeneralConfigService, $translate, $log, lodash) {
    var vm = this;
    vm.title = 'HeaderAdminCtrl';
    var _ = lodash;
    var __=GeneralConfigService;

    activate();

    ////////////////

    function activate() {

      vm.navMeny = [
        {
          href: 'admin',
          text: 'NAV_ADM',
        },
        {
          href: 'admin_testimonials',
          text: 'NAV_ADM_TESTIMONIALS',
        },
      ];

    } // activate

  }

})();

