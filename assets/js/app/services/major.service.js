(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .factory('MajorService', MajorService);

  MajorService.$inject = ['$log', 'configCamel'];

  /* @ngInject */
  function MajorService($log, configCamel) {

    var numLang = 2;
    var lang = 'en';
    var langList = ['en', 'ru'];
    var langTitle = ['English', 'Русский'];
    var langActiveTab = ['lang_eng', 'lang_rus'];
    var pagerNumRecords = 2;
    var camelConfig = configCamel;
    var scrollDisabled = false;

    var service = {
      getNumLang: _getNumLang,
      getLang: _getLang,
      setLang: _setLang,
      getLangList: _getLangList,
      getLangTitle: _getLangTitle,
      getLangActiveTab: _getLangActiveTab,
      getPagerNumRecords: _getPagerNumRecords,
      getConfig: _getConfig,
      getScrollDisabled: _getScrollDisabled,
    };
    return service;

    ////////////////

    function _getNumLang() {
      return numLang;
    } // _getNumLang

    function _getLang() {
      return lang;
    } // _getLang

    function _setLang(l) {
      lang = l;
    } // _setLang

    function _getLangList() {
      return langList;
    } // _getLangList

    function _getLangTitle() {
      return langTitle;
    } // _getLangTitle

    function _getLangActiveTab() {
      return langActiveTab;
    } // _getLangActiveTab

    function _getPagerNumRecords() {
      return pagerNumRecords;
    } // _getPagerNumRecords

    function _getConfig() {
      return camelConfig;
    } // _getConfig

    function _getScrollDisabled() {
      return scrollDisabled;
    } // _getScrollDisabled

  } // MajorService

})();


