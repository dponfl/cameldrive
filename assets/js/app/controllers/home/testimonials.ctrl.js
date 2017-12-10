(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('TestimonialsCtrl', TestimonialsCtrl);

  TestimonialsCtrl.$inject = ['MajorService', 'TestimonialsService', 'lodash', '$log', '$q', '$rootScope'];

  /* @ngInject */
  function TestimonialsCtrl(MajorService, TestimonialsService, lodash, $log, $q, $rootScope) {
    var vm = this;
    var _ = lodash;
    var _ms = MajorService;
    vm.title = 'CarCtrl';

    vm.config = _ms.getConfig();

    vm.panelGroups = [];
    vm.innerGroup = [];
    vm.panels = [];
    vm.panelsAllLangs = [];
    vm.highlights = [];

    this.$onInit = function () {
/*
      $log.info('TestimonialsCtrl, $onInit...');
*/
      activate();
    };

    ////////////////

    function activate() {

      $rootScope.$on('lang_change', function (e) {
        _update();
/*
        $log.info('TestimonialsCtrl, event object:');
        $log.info(e);
*/
      });

      $q.when(_performRequest())
        .then(function (res) {

          var randRec;
          var numRecs;
          var rec = [];
          var tmpArray = [];
          var numRecToShow = _ms.getTestimonialsNumber();

/*
          $log.info('TestimonialsCtrl, activate, res:');
          $log.info(res);
*/

          if (!res.performed &&
            (res.reason == 'notFound' || res.reason == 'serverError')) {
            return;
          }

          numRecs = res.data.objs.en.length;

/*
          $log.info('Number of records: ' + numRecs);
*/

          for (let i = 1; i <= numRecToShow; i++) {

            var j = 0;

            do {
              j++;
              randRec = _.random(numRecs-1);
            } while (_some(randRec, rec) && j < 10000);

            rec.push(randRec);
          }

/*
          $log.info('Generated rec:');
          $log.info(rec);
*/

          for (var key in res.data.objs) {
            tmpArray = [];
            rec.map(function (elem) {
              tmpArray.push(res.data.objs[key][elem]);
            });
            res.data.objs[key]=tmpArray;
          }

          var buildResult = _buildPanel(res);

/*
          $log.info('TestimonialsCtrl, activate, buildResult:');
          $log.info(buildResult);
*/

          if (!buildResult.performed) return;

          vm.panelsAllLangs = buildResult.data;

          _ms.setTestimonialsPanelsAllLangs(vm.panelsAllLangs);

          _update();

          return;
        });

    } // activate

    function _some(val, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          return true;
        }
      }
      return false;
    } // _some

    function _buildPanelGroups () {
      vm.panelGroups = [];
      vm.innerGroup = [];

      for (var i = 1; i < vm.panels.length+1; i++) {
        vm.panels[i-1].ind = i-1;
        vm.innerGroup.push(vm.panels[i-1]);
        if (i % 3 == 0) {
          vm.panelGroups.push(vm.innerGroup);
          vm.innerGroup = [];
        }
      }
      if (vm.innerGroup.length != 0) vm.panelGroups.push(vm.innerGroup);
    } // buildPanelGroups

    function _update() {

      let panelsAllLangs = _ms.getTestimonialsPanelsAllLangs();
      vm.panels = panelsAllLangs[_ms.getLang()];
      _ms.setTestimonialsPanels(vm.panels);

      /*
       $log.info(vm.panels);
       */

      _buildPanelGroups();
    } // _update

    function _performRequest() {
      return $q.all({
        objs: TestimonialsService.getTestimonials({show: 1})
      })
        .then(function (results) {
/*
          $log.info('TestimonialsCtrl, __performRequest results:');
          $log.info(results);
*/

          if (results.objs.status == 404) {

            return {
              performed: false,
              reason: 'notFound',
              data: {
                objs: {},
              },
            };
          }

          if (results.objs.status == 500) {

            return {
              performed: false,
              reason: 'serverError',
              data: {
                objs: {},
              },
            };
          }

          if (results.objs.status == 200) {

            return {
              performed: true,
              reason: 'ok',
              data: {
                objs: results.objs.data,
              },
            };
          }
        })
        .catch(function (err) {
          // todo: change by Log
          $log.warn(vm.title + ', Error...');
          $log.error(err);

          return {
            performed: false,
            reason: 'error',
            data: {
              error: err,
            },
          };
        })
    } // _performRequest

    function _buildPanel(requestResult) {

      if (!requestResult.performed) {

        return {
          performed: requestResult.performed,
          reason: requestResult.reason,
          data: [],
        };
      }

      var result = {};

      var langList = _ms.getLangList();
      langList.map(function (elem) {
        result[elem] = __buildPanelOneLang(requestResult.data.objs[elem], elem);
      });

      return {
        performed: true,
        reason: 'ok',
        data: result,
      };

      function __buildPanelOneLang(panelObjs, lang) {

        var panels = [];
        var record = {};

        panelObjs.map(function (oElem) {

          record = {
            show: oElem.show,
            info: oElem.info,
            name: oElem.name,
            position: oElem.position,
            rate: oElem.rate,
            id: oElem.id,
          };

          panels.push(record);

        });

        return panels;

      } // __buildPanelOneLang

    } // _buildPanel

  } // TestimonialsCtrl

})();

