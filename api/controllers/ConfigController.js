"use strict";

const _ = require('lodash');

module.exports = {
  loadConfig: function (req, res) {

    console.log('<== ConfigController.js:loadConfig ==>');

    Promise.all([capacityPromise(), climatPromise(),
      getHost(), getToken()])
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

  },
};