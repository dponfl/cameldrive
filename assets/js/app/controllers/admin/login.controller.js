(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$log', '$state', 'lodash', '$translate', 'GeneralConfigService'];

  /* @ngInject */
  function LoginController($log, $state, lodash, $translate, GeneralConfigService) {

    $log.info('LoginController');

    var _ = lodash;
    var vm = this;
    vm.title = 'LoginController';
    vm.init = _initController;
    vm.login = _loginUser;
    vm.clear = _clear;

    vm.user = null;
    vm.username = '';
    vm.password = '';
    vm.wrongLogin = false;

    this.$onInit = function () {

      // $log.info('$onInit...');

      $translate.use('ru');
      GeneralConfigService.setLang('ru');
      _initController();
    };



    ////////////////

    function _initController() {


      // get current user
      // UserService.getCurrentUser().then(function (data) {
      //
      //   $log.info('_initController, data:');
      //   $log.info(data);
      //
      //   if (_.has(data, 'session')
      //     && _.has(data.session, 'authenticated')
      //     && _.has(data.session, 'passport')
      //     && _.has(data.session.passport, 'user')
      //     && _.has($rootScope.currentUser, 'username')
      //     && _.has($rootScope.currentUser, 'id')
      //     && $rootScope.currentUser.id == data.session.passport.user
      //   ) {
      //
      //     vm.username = $rootScope.currentUser.username;
      //   } else {
      //     vm.username = '';
      //     vm.password = '';
      //   }
      // });
    } // _initController

    function _loginUser() {

      $log.info('_loginUser');

      // vm.wrongLogin = false;
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
      //   vm.wrongLogin = true;
      // });

    } // _loginUser

    function _clear() {
      vm.username = '';
      vm.password = '';
      vm.wrongLogin = false;
    } // _clear

  } // LoginController

})();

