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
    vm.notEqualPasswords = false;

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
      vm.notEqualPasswords = vm.password != vm.password2;

      if (vm.notEqualPasswords) {
        return;
      }


      $q.all({
        user: UserService.getUser({
          username: vm.username,
          deleted: false,
        })
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

              if (!_.isNil(data.user.data) && !_.isNil(data.user.data.result)) {

                if (data.user.data.result.pw) {
                  vm.wrongSignup = true;
                  setTimeout(() => {
                    $state.go('login', {login: data.user.data.result.username});
                  }, 3000);
                  return;
                }

                if (data.user.data.result.admin) {

                  // $log.info('111111111111111111111');
                  // $log.info('data.user.data.result.admin: ' + data.user.data.result.admin);

                  /**
                   * save password
                   */

                  $q.all({
                    updatedUser: UserService.updateUser({
                      id: data.user.data.result.id
                    }, {
                      pw: vm.password
                    })
                  }).then((rec) => {

                    $log.info('updated user: ');
                    $log.info(rec);
                    $state.go('admin');
                  })
                    .catch((error) => {

                      $log.info(_getFullModuleName(moduleName) + ', error: ');
                      $log.info(err);

                      vm.generalError = true;
                    });
                } else {

                  // $log.info('22222222222222222222222222222');
                  // $log.info('data.user.data.result.admin: ' + data.user.data.result.admin);

                  /**
                   * save password
                   */


                  vm.userNotAdmin = true;
                  setTimeout(() => {
                    $state.go('home');
                  }, 3000);
                }
              }



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
      vm.notEqualPasswords = false;
    } // _clear

  } // SignupController

})();

