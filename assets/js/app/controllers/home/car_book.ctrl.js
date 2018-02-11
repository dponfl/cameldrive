(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('CarBookCtrl', CarBookCtrl);

  CarBookCtrl.$inject = ['MajorService', 'GeneralConfigService', 'S_ReqService', '$log', 'lodash', 'toaster'];

  /* @ngInject */
  function CarBookCtrl(MajorService, GeneralConfigService, S_ReqService, $log, lodash, toaster) {
    var vm = this;
    var _ = lodash;
    var _ms = MajorService;
    var __=GeneralConfigService;
    vm.title = 'CarBookCtrl';

    vm.config = _ms.getConfig();

    vm.book = _book;
    vm.clear = _clear;

    this.$onInit = function () {
      $log.info(vm.title + ', $onInit...');
      activate();
    };


    function activate() {
      vm.formData = {};

      // todo: get car groups from database

      vm.carGroupList = [
        {
          key: 'G001',
          val: 'Group A',
        },
        {
          key: 'G002',
          val: 'Group B',
        },
        {
          key: 'G003',
          val: 'Group C',
        },
      ];
      vm.startDate = new Date();
      vm.startDate.setDate(vm.startDate.getDate() - 1);
      vm.busyBook = false;
      vm.objectInfo = '';

    } // activate

    function _book() {

      $log.info(vm.title + ', _book was activated...');

      vm.busyBook = true;

      vm.formData.req_type = 'booking';

      $log.info('vm.formData');
      $log.info(vm.formData);

      let recData = {
        req_type: vm.formData.req_type || null,
        car_group: vm.formData.carGroup.val || null,
        name: vm.formData.name || null,
        email: vm.formData.email || null,
        phone: vm.formData.phone || null,
        additionalInfo: vm.formData.additionalInfo || null,
        period_start: vm.formData.period_start || null,
        pariod_end: vm.formData.pariod_end || null,
        pLocation: vm.formData.pLocation || null,
        dLocation: vm.formData.dLocation || null,
        rate: vm.formData.rate || null,
      };

      S_ReqService.createSReq(recData, recData.req_type)
        .then(function (res) {

           $log.info('S_ReqService, res:');
           $log.info(res);

          if (res.status === 200) {
            vm.busyBook = false;
            toaster.pop({
              type: 'success',
              title: __.t('BOOKING_SUCCESS_TITLE'),
              body: __.t('BOOKING_SUCCESS_BODY_1') + vm.objectInfo +
              __.t('BOOKING_SUCCESS_BODY_2'),
              toasterId: vm.formData.objnumber,
              showCloseButton: true,
              timeout: 15000,
            });
          } else {
            vm.busyBook = false;
            toaster.pop({
              type: 'error',
              title: __.t('BOOKING_ERROR_TITLE'),
              body: __.t('BOOKING_ERROR_BODY_1') + vm.objectInfo +
              __.t('BOOKING_ERROR_BODY_2'),
              toasterId: vm.formData.objnumber,
              showCloseButton: true,
              timeout: 15000,
            });
          }
        });
    } // _book

    function _clear() {
      $log.info(vm.title + ', _clear activated...');
      vm.formData = {};
      vm.formData.req_type = 'booking';
      vm.busyBook = false;
    } // _clear
  }

})();

