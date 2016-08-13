// Ionic Starter App
(function() {
  var app = angular.module('myNotes', ['ionic']);
  app.controller('ListCtrl', ['$scope', function($scope) {
    $scope.notes = [{
      title: 'First Note',
      description: 'This is my first note.'
    }, {
      title: 'Second Note',
      description: 'This is my second note.'
    }, {
      title: 'Third Note',
      description: 'This is my third note.'
    }];
  }]);

  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/list');

    $stateProvider.state('list', {
        url: '/list',
        templateUrl: 'templates/list.html'
      })
      .state('edit', {
        url: '/edit',
        templateUrl: 'templates/edit.html'
      });
  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
}());