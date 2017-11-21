(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('CarCtrl', CarCtrl);

  CarCtrl.$inject = ['MajorService', 'CarsService', 'lodash', '$log', '$q', '$rootScope'];

  /* @ngInject */
  function CarCtrl(MajorService, CarsService, lodash, $log, $q, $rootScope) {
    var vm = this;
    var _ = lodash;
    var _ms = MajorService;
    vm.title = 'CarCtrl';

    vm.panelGroups = [];
    vm.innerGroup = [];
    vm.panels = [];
    vm.panelsAllLangs = {};
    vm.highlights = [];

    vm.activateDetails = _activateDetails;
    vm.deactivateDetails = _deactivateDetails;

    this.$onInit = function () {
       $log.info('$onInit...');
      activate();
    };


    ////////////////

    function activate() {

      $rootScope.$on('lang_change', function (e) {
        _update();
        $log.info('Event object:');
        $log.info(e);
      });

/*
      vm.highlights = [
        {
          header: 'Some header 1',
          content: 'Message 1'
        },
        {
          header: 'Some header 2',
          content: 'Message sfsfdkl ljsflsjdfl lkfjsldfjsdlf lsdlsdfjlsdf lkslfdflsdj jsdlfkjsdf'
        },
      ];
*/

      vm.panelsAllLangs = {
        en: [
          {
            img: '../../img/GA001.jpg',
            alt: 'Image_GA001',
            group: 'A',
            title: 'Mazda Demio 1350cc, A/C',
            content: [
              [            {
                key: 'transmission',
                label: 'Transmission:',
                text: 'Manual grgergn erg erg erg gr erge rger gergerg ererger gerg e rge rger',
              },
                {
                  key: 'capacity',
                  label: 'Capacity:',
                  text: '2 adults',
                },
              ],
              [],
            ],
            priceFrom: '15',
            showDetails: false,
          },
          {
            img: '../../img/GB001.jpg',
            alt: 'Image_GB001',
            group: 'B',
            title: 'Suzuki Swift 1250cc, A/C',
            content: [
              [            {
                key: 'transmission',
                label: 'Transmission:',
                text: 'Automatic',
              },
                {
                  key: 'capacity',
                  label: 'Capacity:',
                  text: '4 adults',
                },
              ],
              [],
            ],
            priceFrom: '15',
            showDetails: false,
          },
          {
            img: '../../img/GC001.jpg',
            alt: 'Image_GC001',
            group: 'C',
            title: 'VW Polo 1200cc, A/C',
            content: [
              [            {
                key: 'transmission',
                label: 'Transmission:',
                text: 'Automatic',
              },
                {
                  key: 'capacity',
                  label: 'Capacity:',
                  text: '5 adults',
                },
              ],
              [],
            ],
            priceFrom: '20',
            showDetails: false,
          },
          {
            img: '../../img/GD001.png',
            alt: 'Image_GD001',
            group: 'D',
            title: 'Nissan Juke 1600cc, A/C',
            content: [
              [            {
                key: 'transmission',
                label: 'Transmission:',
                text: 'Automatic',
              },
                {
                  key: 'capacity',
                  label: 'Capacity:',
                  text: '5 adults',
                },
              ],
              [],
            ],
            priceFrom: '30',
            showDetails: false,
          },        ],
        ru: [
          {
            img: '../../img/GA001.jpg',
            alt: 'Image_GA001',
            group: 'A',
            title: 'Mazda Demio 1350cc, A/C',
            content: [
              [            {
                key: 'transmission',
                label: 'Трансмиссия:',
                text: 'Ручная бла-бла-бла',
              },
                {
                  key: 'capacity',
                  label: 'Вместимость:',
                  text: '2 взрослых',
                },
              ],
              [],
            ],
            priceFrom: '15',
            showDetails: false,
          },
          {
            img: '../../img/GB001.jpg',
            alt: 'Image_GB001',
            group: 'B',
            title: 'Suzuki Swift 1250cc, A/C',
            content: [
              [            {
                key: 'transmission',
                label: 'Трансмиссия:',
                text: 'Автоматическая',
              },
                {
                  key: 'capacity',
                  label: 'Вместимость:',
                  text: '4 взрослых',
                },
              ],
              [],
            ],
            priceFrom: '15',
            showDetails: false,
          },
          {
            img: '../../img/GC001.jpg',
            alt: 'Image_GC001',
            group: 'C',
            title: 'VW Polo 1200cc, A/C',
            content: [
              [            {
                key: 'transmission',
                label: 'Трансмиссия:',
                text: 'Автоматическая',
              },
                {
                  key: 'capacity',
                  label: 'Вместимость:',
                  text: '5 взрослых',
                },
              ],
              [],
            ],
            priceFrom: '20',
            showDetails: false,
          },
          {
            img: '../../img/GD001.png',
            alt: 'Image_GD001',
            group: 'D',
            title: 'Nissan Juke 1600cc, A/C',
            content: [
              [            {
                key: 'transmission',
                label: 'Трансмиссия:',
                text: 'Автоматическая',
              },
                {
                  key: 'capacity',
                  label: 'Вместимость:',
                  text: '5 взрослых',
                },
              ],
              [],
            ],
            priceFrom: '30',
            showDetails: false,
          },        ],
      };

      $q.when(_performRequest())
        .then(function (res) {

          $log.info('_performRequest, res:');
          $log.info(res);

          if (!res.performed &&
            (res.reason == 'notFound' || res.reason == 'serverError')) {
            return;
          }

          var buildResult = _buildPanel(res);

          if (!buildResult.performed) return;

          vm.panelsAllLangs = buildResult.data;

          _ms.setCarPanelsAllLangs(vm.panelsAllLangs);

          _update();

          return;
        });

/*
      _ms.setCarPanelsAllLangs(vm.panelsAllLangs);

      _update();
*/

    } // activate

    function _activateDetails(elemInd) {
      vm.panels[elemInd].showDetails = true;
    } // activateDetails

    function _deactivateDetails(elemInd) {
      vm.panels[elemInd].showDetails = false;
    } // deactivateDetails

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

/*
      $log.info('_update...');
      $log.info(_ms.getCarPanelsAllLangs());
      $log.info(_ms.getLang());
*/

      let panelsAllLangs = _ms.getCarPanelsAllLangs();
      vm.panels = panelsAllLangs[_ms.getLang()];

/*
      $log.info(vm.panels);
*/

      _buildPanelGroups();
    } // _update

    function _performRequest() {
      return $q.all({
        keys: CarsService.getAllCarKeys({show: 1}),
        objs: CarsService.getAllCarObjs({show: 1})
      })
        .then(function (results) {
          $log.info('__performRequest results:');
          $log.info(results);

          if (results.objs.status == 404) {
            // $rootScope.long.showNotFound = true;

/*
            if (objReqPager.page == 1) {
              $rootScope.long.showFoundNothing = true;
            }
*/

            return {
              performed: false,
              reason: 'notFound',
              data: {
                keys: {},
                objs: {},
              },
            };
          }

          if (results.objs.status == 500) {
            // $rootScope.long.showServerError = true;

            return {
              performed: false,
              reason: 'serverError',
              data: {
                keys: {},
                objs: {},
              },
            };
          }

          if (results.objs.status == 200) {
            // $rootScope.long.showNotFound = false;
            // $rootScope.long.showServerError = false;

            return {
              performed: true,
              reason: 'ok',
              data: {
                keys: results.keys,
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

    function _buildPanel() {

    } // _buildPanel


  }

})();

