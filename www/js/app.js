// Ionic Starter App
(function() {
  var app = angular.module('myNotes', ['ionic']);

  app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/list');

    $stateProvider.state('list', {
        url: '/list',
        templateUrl: 'templates/list.html'
      })
      .state('edit', {
        url: '/edit/:noteId',
        templateUrl: 'templates/edit.html'
      })
      .state('add', {
        url: '/add',
        templateUrl: 'templates/add.html'
      });
  });

  app.service('notes', function() {
    // return [{
    //   id: '1',
    //   title: 'First Note',
    //   description: 'This is my first note.'
    // }, {
    //   id: '2',
    //   title: 'Second Note',
    //   description: 'This is my second note.'
    // }, {
    //   id: '3',
    //   title: 'Third Note',
    //   description: 'This is my third note.'
    // }];
    return [];
  });

  app.controller('ListCtrl', ['$scope', 'notes', function($scope, notes) {
    $scope.notes = notes;
  }]);

  app.controller('EditCtrl', ['$scope', '$state', 'notes', function($scope, $state, notes) {
    $scope.noteId = $state.params.noteId;
    //  $scope.notes = notes;
    $scope.notes = angular.copy(notes);

    $scope.getNote = function(noteId) {
      for (var i = 0; i < $scope.notes.length; i++) {
        if ($scope.notes[i].id == noteId) {
          return $scope.notes[i];
        }
      }
      return undefined;
    }

    $scope.selectNote = $scope.getNote($scope.noteId);

    $scope.updateNote = function(noteId, note) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id == noteId) {
          notes[i] = angular.copy(note);
        }
      }
    }

    $scope.save = function() {
      $scope.updateNote($scope.noteId, $scope.selectNote);
      $state.go('list');
    }

  }]);

  app.controller('AddCtrl', ['$scope', '$state', 'notes', function($scope, $state, notes) {
    $scope.note = {};
    $scope.add = function() {
      $scope.note.id = new Date().getTime().toString();
      console.log('new note', $scope.note);
      notes.push(angular.copy($scope.note));
      $state.go('list');
    }
  }]);

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