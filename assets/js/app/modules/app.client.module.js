(function () {
  'use strict';

  angular
    .module('Cameldrive', [
      'app.core',
      'app.client.routes',
      'app.translate.module',
      'app.client.config'
    ])
    .run(setupGlobalScope);

  setupGlobalScope.$inject = ['$rootScope', '$log'];
  function setupGlobalScope($rootScope, $log) {


    // todo: delete
    $log.info('Cameldrive, setupGlobalScope...');


    //Generale
    // $rootScope.numLang = 2;
    // $rootScope.lang = 'en';
    // $rootScope.langList = ['en', 'ru'];
    // $rootScope.langTitle = ['English', 'Русский'];
    // $rootScope.langActiveTab = ['lang_eng', 'lang_rus'];
    //
    // $rootScope.pagerNumRecords = 2;
    // $rootScope.orangeConfig = configCamel;
    // $rootScope.scrollDisabled = false;
    // $rootScope.panelsAllLangs = {};

    // Images upload config

    // $rootScope.imgFileNameElement = '$$$_-_$$$';

    // Short term
/*
    $rootScope.short = {};
    $rootScope.short.showNotFound = false;
    $rootScope.short.page = 1;
    $rootScope.short.FindActivated = false;
    $rootScope.short.FilterData = {};
    $rootScope.short.scrollDisabled = false;
    $rootScope.short.showFoundNothing = false;
    $rootScope.short.showServerError = false;
    $rootScope.short.panelsAllLangs = {};
    $rootScope.short.panels = [];
    $rootScope.short.busy = false;
*/



    // Admin
    $rootScope.admin = {};
    $rootScope.admin.long = {};
    $rootScope.admin.long.editObjSelected = false;
    $rootScope.admin.long.objNumber = '';
    $rootScope.admin.long.editPanelShow = false;
    $rootScope.admin.long.formData = {};
    $rootScope.admin.long.editObjEnableButton = true;
    $rootScope.admin.long.updateEditRecords = false;
    $rootScope.admin.long.FindActivated = false;




    // $log.info('Cameldrive, $rootScope:');
    // $log.info($rootScope);
  }

})();