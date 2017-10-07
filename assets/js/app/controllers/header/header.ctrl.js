(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = ['GeneralConfigService', 'S_ReqService', '$rootScope', '$scope', '$modal', '$log',
    'lodash', 'toaster'];

  /* @ngInject */
  function HeaderCtrl(GeneralConfigService, S_ReqService, $rootScope, $scope, $modal, $log,
                      lodash, toaster) {
    var vm = this;
    vm.title = 'HeaderCtrl';
    var _ = lodash;
    var __=GeneralConfigService;

    activate();

/*
    $log.info('$rootScope.orangeConfig:');
    $log.info($rootScope.orangeConfig);
    $log.info('$rootScope.orangeConfig.host:');
    $log.info($rootScope.orangeConfig.host);
    $log.info('$rootScope.orangeConfig.objList:');
    $log.info($rootScope.orangeConfig.objList);
    $log.info('$rootScope.lang:');
    $log.info($rootScope.lang);
    $log.info('keys:');
    $log.info(_.keys($rootScope.orangeConfig));
*/


    // $log.info('$rootScope.orangeConfig.objList[$rootScope.lang][0]:');
    // $log.info($rootScope.orangeConfig.objList[$rootScope.lang][0]);

    // $rootScope.$watch('lang', update);

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
          href: 'cars',
          text: 'NAV_CARS',
        },
        {
          href: 'discount',
          text: 'NAV_DISCOUNT',
        },
      ];

      vm.dropdownMenu = [
/*
        {
          action: 'short',
          text: 'NAV_REQ_DAILY',
        },
        {
          action: 'long',
          text: 'NAV_REQ_LONG_TERM',
        },
        {
          action: 'let',
          text: 'NAV_REQ_LET_PROP',
        },
        {
          action: 'buy',
          text: 'NAV_REQ_BUY_PROP',
        },
        {
          action: 'sell',
          text: 'NAV_REQ_SELL_PROP',
        },
*/
      ];

    } // activate

  }

})();

