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
  }])

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