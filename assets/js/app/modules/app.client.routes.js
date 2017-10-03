"use strict";

(function () {

  angular.module('app.client.routes', [
    'app.core'
  ])
    .config(CameldriveRoutesConfig);

  CameldriveRoutesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
  function CameldriveRoutesConfig($stateProvider, $locationProvider, $urlRouterProvider) {


    // todo: delete
    console.log('app.client.routes: CameldriveRoutesConfig');


    $stateProvider
      .state('home', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          section001: {
            templateUrl: 'templates/view/home/section001.html'
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/'
      })
      .state('conditions', {
        views: {
          header: {
            templateUrl: 'templates/view/header/headerClient.html'
          },
          section001: {
            templateUrl: 'templates/view/conditions.html',
          },
          footer: {
            templateUrl: 'templates/view/footer/footerClient.html'
          },
        },
        url: '/exclusive',
      })


    // todo: delete
    console.log('app.client.routes: CameldriveRoutes');

    $urlRouterProvider
      .otherwise('/');

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
  } // CameldriveRoutesConfig


})();