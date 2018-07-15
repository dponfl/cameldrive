(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('TestimonialsPanelAdminTblCtrl', TestimonialsPanelAdminTblCtrl);

  TestimonialsPanelAdminTblCtrl.$inject = ['$scope', '$log'];

  /* @ngInject */
  function TestimonialsPanelAdminTblCtrl($scope, $log) {
    var vm = this;
    vm.title = 'TestimonialsPanelAdminTblCtrl::';

    this.$onInit = function () {
      // $log.info(vm.title + ', $onInit...');
      // $log.info('$scope:');
      // $log.info($scope);
    };

    activate();

    ////////////////

    function activate() {

      // $log.info(vm.title + ', activate...');

      vm.sort = _sort;
      vm.clearSort = _clearSort;
      vm.edit = _edit;
      vm.delete =_delete;

      vm.reverse = false;
      vm.editMode = false;


      vm.activeTabMain = 'new_obj';

    } // activate()

    function _sort(keyName) {
      const method = '_sort';

      // $log.info(vm.title + method + ', keyName: ' + keyName);


      vm.sortKey = keyName;
      vm.reverse = !vm.reverse;
    } // _sort

    function _clearSort() {
      const method = '_clearSort';

      // $log.info(vm.title + method);

      vm.sortKey ='';
      vm.reverse = false;
    } // _clearSort

    function _edit(recId) {
      const method = '_edit';

      // $log.info(vm.title + method + ', recId: ' + recId);

      vm.editMode = true;


    } // _edit

    function _delete(recId) {
      const method = '_delete';

      // $log.info(vm.title + method + ', recId: ' + recId);

    } // _delete
  }

})();

