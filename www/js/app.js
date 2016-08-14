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
    var notes = angular.fromJson(window.localStorage['notes']) || [];

    function persist() {
      window.localStorage['notes'] = angular.toJson(notes);
    }

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
      create: function(newNote) {
        notes.push(newNote);
        persist();
      },
      updateNote: function(noteId, note) {
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].id == noteId) {
            notes[i] = angular.copy(note);
            persist();
            return;
          }
        }
      },
      remove: function(noteId) {
        for (var i = 0; i < notes.length; i++) {
          if (notes[i].id == noteId) {
            notes.splice(i, 1);
            persist();
            return;
          }
        }
      },
      move: function(node, fromIndex, toIndex) {
        notes.splice(fromIndex, 1);
        notes.splice(toIndex, 0, node);
        persist();
      }
    };
  });

  app.controller('ListCtrl', ['$scope', 'notes', function($scope, notes) {
    $scope.notes = notes.list();
    $scope.reordering = false;

    $scope.remove = function(noteId) {
      notes.remove(noteId);
    }

    $scope.move = function(note, fromIndex, toIndex) {
      console.log('moving from index: ', fromIndex);
      console.log('to index: ', toIndex);
      notes.move(note, fromIndex, toIndex);
    }

    $scope.toggleReordering = function() {
      console.log('reordering: ', $scope.reordering);
      $scope.reordering = !$scope.reordering;
    }

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
      notes.create(angular.copy($scope.note));
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