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
    var notes = [];
    return {
      list: function() {
        return notes;
      },
      getNote: function(noteId) {
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].id == noteId) {
            return angular.copy(notes[i]);
          }
        }
        return undefined;
      },
      updateNote: function(noteId, note) {
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].id == noteId) {
            notes[i] = angular.copy(note);
          }
        }
      }
    };
  });

  app.controller('ListCtrl', ['$scope', 'notes', function($scope, notes) {
    $scope.notes = notes.list();
  }]);

  app.controller('EditCtrl', ['$scope', '$state', 'notes', function($scope, $state, notes) {
    $scope.noteId = $state.params.noteId;
    $scope.selectNote = notes.getNote($scope.noteId);
    $scope.save = function() {
      notes.updateNote($scope.noteId, $scope.selectNote);
      $state.go('list');
    }
  }]);

  app.controller('AddCtrl', ['$scope', '$state', 'notes', function($scope, $state, notes) {
    $scope.note = {};
    $scope.add = function() {
      $scope.note.id = new Date().getTime().toString();
      console.log('new note', $scope.note);
      notes.list().push(angular.copy($scope.note));
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