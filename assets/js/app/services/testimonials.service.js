(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .service('TestimonialsService', TestimonialsService);

  TestimonialsService.$inject = ['MajorService', '$http', '$log', 'lodash', '$q'];

  /* @ngInject */
  function TestimonialsService(MajorService, $http, $log, lodash, $q) {
    var _ = lodash;
    var _ms = MajorService;
    var self = {
      getTestimonials: _getTestimonials,
      putTestimonials: _putTestimonials,
      updateTestimonials: _updateTestimonials,
    };

    return self;

    ////////////////

    function _getTestimonials(reqObj) {

      return $http.post(_ms.getHost() + '/testimonials/find', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        $log.info('_getTestimonials, successCb');

        if (!_.isArray(data.data.result)) {
          return new Error('_getTestimonials, Testimonials data is not an array');
        }

        var response = data.data.result;

        var __objs = {
          en: [],
          ru: [],
        };

        for (var i = 0; i < response.length; i++) {

          __objs['en'].push({
            show: response[i].show,
            original: response[i].original,
            name: response[i].name_en,
            email: response[i].email,
            phone: response[i].phone,
            info: response[i].info_en,
            position: response[i].position_en,
            rate: response[i].rate,
            user_agent: response[i].user_agent,
            ip: response[i].ip,
            cookie: response[i].cookie,
            id: response[i].id,
            createdAt: response[i].createdAt,
            updatedAt: response[i].updatedAt,
          });

          __objs['ru'].push({
            show: response[i].show,
            original: response[i].original,
            name: response[i].name_ru,
            email: response[i].email,
            phone: response[i].phone,
            info: response[i].info_ru,
            position: response[i].position_ru,
            rate: response[i].rate,
            user_agent: response[i].user_agent,
            ip: response[i].ip,
            cookie: response[i].cookie,
            id: response[i].id,
            createdAt: response[i].createdAt,
            updatedAt: response[i].updatedAt,
          });

        }

        return {
          status: 200,
          data: __objs,
        };
      } // successCb

      function errorCb(err) {

        $log.info('_getTestimonials, errorCb');

        return {
          status: err.status,
          error: err,
        }
      } // errorCb

    } // _getTestimonials

    function _putTestimonials(reqObj) {

      return $http.post(_ms.getHost() + '/testimonials/put', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        $log.info('_putTestimonials, successCb, data:');
        $log.info(data);

        if (!_.isNumber(data.data.result.id)) {
          return new Error('_putTestimonials, Testimonials data has wrong format');
        }

        var response = data.data.result;

        var __objs = {
          en: [],
          ru: [],
        };

        __objs['en'].push({
          show: response.show,
          original: response.original,
          name: response.name_en,
          email: response.email,
          phone: response.phone,
          info: response.info_en,
          position: response.position_en,
          rate: response.rate,
          user_agent: response.user_agent,
          ip: response.ip,
          cookie: response.cookie,
          id: response.id,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        });

        __objs['ru'].push({
          show: response.show,
          original: response.original,
          name: response.name_ru,
          email: response.email,
          phone: response.phone,
          info: response.info_ru,
          position: response.position_ru,
          rate: response.rate,
          user_agent: response.user_agent,
          ip: response.ip,
          cookie: response.cookie,
          id: response.id,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        });

        return {
          status: 201,
          data: __objs,
        };
      }

      function errorCb(err) {

        return {
          status: err.status,
          error: err,
        }
      }

    } // _putTestimonials

    function _updateTestimonials(reqObj) {

      $log.info('_updateTestimonials, reqObj:');
      console.dir(reqObj);

      return $http.post(_ms.getHost() + '/testimonials/update', reqObj)
        .then(successCb, errorCb);

      function successCb(data) {

        $log.info('_updateTestimonials, successCb, data:');
        $log.info(data);

        if (!_.isNumber(data.data.result[0].id)) {
          return new Error('_updateTestimonials, Testimonials data has wrong format');
        }

        var response = data.data.result[0];

        /*
         $log.info('_updateTestimonials, response:');
         console.dir(response);
         $log.info('_updateTestimonials, response.length:');
         console.dir(response.length);
         */

        var __objs = {
          en: [],
          ru: [],
        };

        __objs['en'].push({
          show: response.show,
          original: response.original,
          name: response.name_en,
          email: response.email,
          phone: response.phone,
          info: response.info_en,
          position: response.position_en,
          rate: response.rate,
          user_agent: response.user_agent,
          ip: response.ip,
          cookie: response.cookie,
          id: response.id,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        });

        __objs['ru'].push({
          show: response.show,
          original: response.original,
          name: response.name_ru,
          email: response.email,
          phone: response.phone,
          info: response.info_ru,
          position: response.position_ru,
          rate: response.rate,
          user_agent: response.user_agent,
          ip: response.ip,
          cookie: response.cookie,
          id: response.id,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        });

        return {
          status: 200,
          data: __objs,
        };
      }

      function errorCb(err) {

        return {
          status: err.status,
          error: err,
        }
      }

    } // _updateTestimonials
  } // TestimonialsService

})();

