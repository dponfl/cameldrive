(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['UserService', '$log', '$state', 'lodash', '$translate',
    'GeneralConfigService', '$q'];

  /* @ngInject */
  function SignupController(UserService, $log, $state, lodash, $translate,
                            GeneralConfigService, $q) {

    $log.info('SignupController');

    var _ = lodash;
    var vm = this;
    vm.title = 'SignupController';
    vm.signup = _signupUser;
    vm.clear = _clear;

    vm.user = null;
    vm.username = '';
    vm.password = '';
    vm.password2 = '';
    vm.wrongSignup = false;
    vm.userNotFound = false;
    vm.userNotAdmin = false;
    vm.generalError = false;

    this.$onInit = function () {

      // $log.info('$onInit...');

      $translate.use('ru');
      GeneralConfigService.setLang('ru');
    };



    ////////////////

    function _getFullModuleName(moduleName) {
      return vm.title + "::" + moduleName;
    } // _getFullModuleName

    function _signupUser() {

      const moduleName = '_signupUser';

      vm.wrongSignup = false;
      vm.userNotFound = false;
      vm.userNotAdmin = false;
      vm.generalError = false;

      $q.all({
        user: UserService.getUser({username: vm.username})
      })
        .then((data) => {

        $log.info(_getFullModuleName(moduleName) + ', data: ');
        $log.info(data);

        if (!_.isNil(data) && !_.isNil(data.user)
          && !_.isNil(data.user.status)) {

          switch (data.user.status) {
            case 200:

              // $log.info(_getFullModuleName(moduleName) + ', data.user: ');
              // $log.info(data.user);

              if (!_.isNil(data.user.data) && !_.isNil(data.user.data.result)
              && !_.isNil(data.user.data.result.admin)) {

                switch (data.user.data.result.admin) {
                  case true:

                    $log.info('111111111111111111111');
                    $log.info('data.user.data.result.admin: ' + data.user.data.result.admin);

                    break;
                  case false:

                    $log.info('22222222222222222222222222222');
                    $log.info('data.user.data.result.admin: ' + data.user.data.result.admin);

                    break;
                }

              }

              // vm.userNotAdmin = true;



              break;
            case 404:
              vm.userNotFound = true;
              break;
          }

        }

      })
        .catch((err) => {

        $log.info(_getFullModuleName(moduleName) + ', error: ');
        $log.info(err);

        vm.generalError = true;

      });

      // vm.wrongSignup = false;
      // UserService.loginUser({
      //   identifier: vm.username,
      //   password: vm.password
      // }).then(function (data) {
      //   $log.info('_loginUser, data:');
      //   $log.info(data);
      //   $rootScope.currentUser = {
      //     id: data.id,
      //     username: data.username,
      //     email: data.email,
      //     first_name: data.first_name,
      //     last_name: data.last_name,
      //   };
      //   $state.go('admin_longterm');
      // }).catch(function (err) {
      //   $log.info('_loginUser, error:');
      //   $log.info(err);
      //   vm.wrongSignup = true;
      // });

    } // _signupUser

    function _clear() {
      vm.username = '';
      vm.password = '';
      vm.password2 = '';
      vm.wrongSignup = false;
      vm.userNotFound = false;
      vm.userNotAdmin = false;
      vm.generalError = false;
    } // _clear

  } // SignupController

})();

