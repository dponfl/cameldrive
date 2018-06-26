(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = ['GeneralConfigService', 'S_ReqService', '$rootScope', '$scope', '$modal', '$log',
    'lodash', 'toaster', 'UserService', '$q', '$state'];

  /* @ngInject */
  function HeaderCtrl(GeneralConfigService, S_ReqService, $rootScope, $scope, $modal, $log,
                      lodash, toaster, UserService, $q, $state) {
    var vm = this;
    vm.title = 'HeaderCtrl';
    var _ = lodash;
    var __=GeneralConfigService;

    vm.user = '';
    vm.showUser = false;

    vm.logout = _logout;


    this.$onInit = function () {

      const moduleName = 'onInit';

      $q.all({
        user: UserService.checkLogInUser()
      })
        .then((rec) => {

          $log.info('checkLogInUser, user:');
          $log.info(rec);

          if (!_.isNil(rec.user.data.activeSession)
            && rec.user.data.activeSession) {

            vm.user = rec.user.data.result.username;
            vm.showUser = true;
          }


        })
        .catch((error) => {

          $log.info(_getFullModuleName(moduleName) + ', error: ');
          $log.info(error);
        });
    };



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

    function _getFullModuleName(moduleName) {
      return vm.title + "::" + moduleName;
    } // _getFullModuleName

    function _logout() {

      let moduleName = '_logout';

      $q.all({
        logoutUser: UserService.logoutUser()
      })
        .then((rec) => {

          $log.info('logout user: ');
          $log.info(rec);

          vm.user = '';
          vm.showUser = false;
          
          $state.go('home');
        })
        .catch((error) => {

          $log.info(_getFullModuleName(moduleName) + ', error: ');
          $log.info(error);
        });
    } // _logout



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
          href: 'insurance',
          text: 'NAV_INSURANCE',
        },
/*
        {
          href: 'discount',
          text: 'NAV_DISCOUNT',
        },
*/
      ];

      vm.dropdownMenu = [
      ];

    } // activate

  }

})();

