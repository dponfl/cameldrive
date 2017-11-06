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
    var imgFileNameElement = '$$$_-_$$$';

    var cars = {
      panelsAllLangs: {},
      panels: {},
    };

    var service = {
      getNumLang: _getNumLang, // setup number of languages in use
      getLang: _getLang, // get current language
      setLang: _setLang, // set current language
      getLangList: _getLangList, // get list of languages in use
      getLangTitle: _getLangTitle, // get languages names
      getLangActiveTab: _getLangActiveTab, // get name of active language tab
      getPagerNumRecords: _getPagerNumRecords, // get number of records to be displayed (for pager)
      getConfig: _getConfig, // get general app config data
      getScrollDisabled: _getScrollDisabled, // get value of scrollDisabled variable
      getImgFileNameElement: _getImgFileNameElement, // get delimiter of img file names
      getCarPanelsAllLangs: _getCarPanelsAllLangs, // get all panels for all languages
      setCarPanelsAllLangs: _setCarPanelsAllLangs, // set all panels for all languages
      getCarPanels: _getCarPanels, // get panels
      setCarPanels: _setCarPanels, // set panels
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

    function _getImgFileNameElement() {
      return imgFileNameElement;
    } // _getImgFileNameElement

    function _getCarPanelsAllLangs() {
      return cars.panelsAllLangs;
    } // _getCarPanelsAllLangs

    function _setCarPanelsAllLangs(p) {
      cars.panelsAllLangs = p;
    } // _setCarPanelsAllLangs

    function _getCarPanels() {
      return cars.panels;
    } // _getCarPanels

    function _setCarPanels(p) {
      cars.panels = p;
    } // _setCarPanels

  } // MajorService

})();

