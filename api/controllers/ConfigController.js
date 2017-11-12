"use strict";

const _ = require('lodash');

module.exports = {
  loadConfig: function (req, res) {

    console.log('<== ConfigController.js:loadConfig ==>');

    Promise.all([capacityPromise(), climatPromise(), fuelPromise(), groupPromise(),
      luggagePromise(), getHost(), getToken()])
      .then(function (data) {

        var result = {};

        _.forEach(data, function (value) {
          _.forEach(value, function (val, key) {
            result[key] = val;
          });
        });

        result['showList'] = {
          en: [
            {
              key: 'any',
              val: 'Any',
            },
            {
              key: 'show',
              val: 'Show',
            },
            {
              key: 'not_show',
              val: 'Do not show',
            },
          ],
          ru: [
            {
              key: 'any',
              val: 'Любой',
            },
            {
              key: 'show',
              val: 'Показывать',
            },
            {
              key: 'not_show',
              val: 'Не показывать',
            },
          ],
        };

        console.log('loadConfig, result:');
        console.dir(result);

        return res.ok({result: 'ok', data: result, token: '123'});
      }, function (reason) {
        console.log('Promise.all error, reason:');
        console.dir(reason);
      });

    /*
    Set of find requests for every tables
     */

    function capacityPromise() {
      return Capacity.find()
        .then(function (data) {

          console.log('Capacity, data:');
          console.log(data);

          var capacityConfig = [];
          capacityConfig.capacityList = {};

          if (!_.isArray(data)) {
            // todo: Log error message and get data from Sails config
            console.log('Capacity data is not an array');
          }

          data.map(_mapCapacityData, capacityConfig);

          _excludeEmptyElem(capacityConfig.capacityList);

          console.log('Capacity, capacityConfig.capacityList after _excludeEmptyElem:');
          console.dir(capacityConfig.capacityList);

          return {capacityList: capacityConfig.capacityList};

        });
    } // capacityPromise

    function climatPromise() {
      return Climat.find()
        .then(function (data) {

          console.log('Climat, data:');
          console.log(data);

          var climatConfig = [];
          climatConfig.climatList = {};

          if (!_.isArray(data)) {
            // todo: Log error message and get data from Sails config
            console.log('Climat data is not an array');
          }

          data.map(_mapClimatData, climatConfig);

          _excludeEmptyElem(climatConfig.climatList);

          console.log('Climat, climatConfig.climatList after _excludeEmptyElem:');
          console.dir(climatConfig.climatList);

          return {climatList: climatConfig.climatList};

        });
    } // climatPromise

    function fuelPromise() {
      return Fuel.find()
        .then(function (data) {

          console.log('Fuel, data:');
          console.log(data);

          var fuelConfig = [];
          fuelConfig.fuelList = {};

          if (!_.isArray(data)) {
            // todo: Log error message and get data from Sails config
            console.log('Fuel data is not an array');
          }

          data.map(_mapFuelData, fuelConfig);

          _excludeEmptyElem(fuelConfig.fuelList);

          console.log('Fuel, fuelConfig.fuelList after _excludeEmptyElem:');
          console.dir(fuelConfig.fuelList);

          return {fuelList: fuelConfig.fuelList};

        });
    } // fuelPromise

    function groupPromise() {
      return Group.find()
        .then(function (data) {

          console.log('Group, data:');
          console.log(data);

          var groupConfig = [];
          groupConfig.groupList = {};

          if (!_.isArray(data)) {
            // todo: Log error message and get data from Sails config
            console.log('Group data is not an array');
          }

          data.map(_mapGroupData, groupConfig);

          _excludeEmptyElem(groupConfig.groupList);

          console.log('Group, groupConfig.groupList after _excludeEmptyElem:');
          console.dir(groupConfig.groupList);

          return {groupList: groupConfig.groupList};

        });
    } // groupPromise

    function luggagePromise() {
      return Luggage.find()
        .then(function (data) {

          console.log('Luggage, data:');
          console.log(data);

          var luggageConfig = [];
          luggageConfig.luggageList = {};

          if (!_.isArray(data)) {
            // todo: Log error message and get data from Sails config
            console.log('Luggage data is not an array');
          }

          data.map(_mapLuggageData, luggageConfig);

          _excludeEmptyElem(luggageConfig.luggageList);

          console.log('Luggage, luggageConfig.luggageList after _excludeEmptyElem:');
          console.dir(luggageConfig.luggageList);

          return {luggageList: luggageConfig.luggageList};

        });
    } // luggagePromise



    /*
    Set of map methods for every table's requests and method to exclude empty elements
     */

    function getHost() {
      // todo: change by setting using Sails config
      return {host: 'http://localhost:1337'};
    };

    function getToken() {
      return {token: '123'};
    }; // getToken


    /**
     * Exclude elements wish show = 0 from select list
     */
    function _excludeEmptyElem(arr) {
      _.forEach(arr, function (elem) {
        _.remove(elem, function (innerElem) {
          return innerElem == -1;
        })
      })
    } // _excludeEmptyElem

    /*
    Capacity
     */

    function _mapCapacityData(elem) {
      if (!_.isArray(this.capacityList[elem.lang]))
        this.capacityList[elem.lang] = [];
      if (elem.show == 0) {
        this.capacityList[elem.lang][elem.order - 1] = -1;
      } else {
        this.capacityList[elem.lang][elem.order - 1] = {};
        this.capacityList[elem.lang][elem.order - 1]['key'] = elem.key;
        this.capacityList[elem.lang][elem.order - 1]['capacity_a'] = elem.capacity_a;
        this.capacityList[elem.lang][elem.order - 1]['capacity_b'] = elem.capacity_b;
        this.capacityList[elem.lang][elem.order - 1]['capacity_text'] = elem.capacity_text;
      }
    } // _mapCapacityData

    /*
    Climat
     */

    function _mapClimatData(elem) {
      if (!_.isArray(this.climatList[elem.lang]))
        this.climatList[elem.lang] = [];
      if (elem.show == 0) {
        this.climatList[elem.lang][elem.order - 1] = -1;
      } else {
        this.climatList[elem.lang][elem.order - 1] = {};
        this.climatList[elem.lang][elem.order - 1]['key'] = elem.key;
        this.climatList[elem.lang][elem.order - 1]['climat'] = elem.climat;
      }
    } // _mapClimatData

    /*
    Fuel
     */

    function _mapFuelData(elem) {
      if (!_.isArray(this.fuelList[elem.lang]))
        this.fuelList[elem.lang] = [];
      if (elem.show == 0) {
        this.fuelList[elem.lang][elem.order - 1] = -1;
      } else {
        this.fuelList[elem.lang][elem.order - 1] = {};
        this.fuelList[elem.lang][elem.order - 1]['key'] = elem.key;
        this.fuelList[elem.lang][elem.order - 1]['fuel'] = elem.fuel;
      }
    } // _mapFuelData

    /*
    Group
     */

    function _mapGroupData(elem) {
      if (!_.isArray(this.groupList[elem.lang]))
        this.groupList[elem.lang] = [];
      if (elem.show == 0) {
        this.groupList[elem.lang][elem.order - 1] = -1;
      } else {
        this.groupList[elem.lang][elem.order - 1] = {};
        this.groupList[elem.lang][elem.order - 1]['key'] = elem.key;
        this.groupList[elem.lang][elem.order - 1]['group'] = elem.group;
        this.groupList[elem.lang][elem.order - 1]['group_details'] = elem.group_details;
      }
    } // _mapGroupData

    /*
     Luggage
     */

    function _mapLuggageData(elem) {
      if (!_.isArray(this.luggageList[elem.lang]))
        this.luggageList[elem.lang] = [];
      if (elem.show == 0) {
        this.luggageList[elem.lang][elem.order - 1] = -1;
      } else {
        this.luggageList[elem.lang][elem.order - 1] = {};
        this.luggageList[elem.lang][elem.order - 1]['key'] = elem.key;
        this.luggageList[elem.lang][elem.order - 1]['luggage_a'] = elem.luggage_a;
        this.luggageList[elem.lang][elem.order - 1]['luggage_b'] = elem.luggage_b;
        this.luggageList[elem.lang][elem.order - 1]['luggage_text'] = elem.luggage_text;
      }
    } // _mapLuggageData


  },
};