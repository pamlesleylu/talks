var app = angular.module('todoApp', []);

app.controller('TodoCtrl', function($scope){
  $scope.todos = [
  { text: 'Create presentation', done: false },
  { text: 'Send email', done: false }
  ];

  $scope.addTask = function() {
    $scope.todos.push( { text: $scope.newTask, done: false } );
    $scope.newTask = "";
  }

  $scope.clearCompleted = function() {
    $scope.todos = $scope.todos.filter(function(todo) {
      return !todo.done;
    })
  }
});