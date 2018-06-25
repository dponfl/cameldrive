(function () {
  'use strict';

  angular
    .module('Cameldrive')
    .service('UserService', UserService);

  UserService.$inject = ['MajorService', '$http', '$log', 'lodash', '$q'];

  /* @ngInject */
  function UserService(MajorService, $http, $log, lodash, $q) {

    const _ = lodash;
    const _ms = MajorService;
    var self = {
      getUser: _getUser,
      updateUser: _updateUser,
    };

    return self;


    ////////////////

    function _getUser(reqObj) {

      var deferred = $q.defer();

      $http.post(_ms.getHost() + '/user/find', reqObj)
        .then(successCb, errorCb);

      function successCb(rec) {

        console.log('<<<<<<<<< successCb >>>>>>>>>>>');
        console.dir(rec);

        // if (!_.isNil(rec) && !_.isNil(rec.data)
        //   && !_.isNil(rec.data.result) && !_.isArray(rec.data.result)) {
        //   return new Error('_getUser, User data is not an array');
        // }

        deferred.resolve(rec);


      } // successCb

      function errorCb(err) {

        console.log('<<<<<<<<<<< errorCb >>>>>>>>>>>');
        console.dir(err);

        if (!_.isNil(err) && !_.isNil(err.status) && err.status == 404) {
          deferred.resolve(err);
        } else {
          deferred.reject(err);
        }

      } // errorCb

      return deferred.promise;

    } // _getUser

    function _updateUser(recCriteria, recVal) {

      var deferred = $q.defer();

      $http.post(_ms.getHost() + '/user/update', {criteria: recCriteria, val: recVal})
        .then(successCb, errorCb);

      function successCb(rec) {

        console.log('<<<<<<<<< successCb >>>>>>>>>>>');
        console.dir(rec);

        // if (!_.isNil(rec) && !_.isNil(rec.data)
        //   && !_.isNil(rec.data.result) && !_.isArray(rec.data.result)) {
        //   return new Error('_getUser, User data is not an array');
        // }

        deferred.resolve(rec);


      } // successCb

      function errorCb(err) {

        console.log('<<<<<<<<<<< errorCb >>>>>>>>>>>');
        console.dir(err);

        if (!_.isNil(err) && !_.isNil(err.status) && err.status == 404) {
          deferred.resolve(err);
        } else {
          deferred.reject(err);
        }

      } // errorCb

      return deferred.promise;

    } // _updateUser

  } // UserService

})();

