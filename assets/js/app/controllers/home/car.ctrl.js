(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .controller('CarCtrl', CarCtrl);

  CarCtrl.$inject = ['GeneralConfigService', 'lodash', '$log'];

  /* @ngInject */
  function CarCtrl(GeneralConfigService, lodash, $log) {
    var vm = this;
    vm.title = 'CarCtrl';

    vm.panelGroups = [];
    vm.innerGroup = [];
    vm.panels = [];

    vm.activateDetails = _activateDetails;
    vm.deactivateDetails = _deactivateDetails;

    this.$onInit = function () {
       $log.info('$onInit...');
      activate();
    };


    ////////////////

    function activate() {

      vm.panels = [
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
                text: '5 adults',
              },
            ],
            [],
          ],
          priceFrom: '15',
          showDetails: false,
        },
      ];

      _buildPanelGroups();
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


  }

})();

