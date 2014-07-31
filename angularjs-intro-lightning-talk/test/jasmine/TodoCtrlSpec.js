'use strict';

describe("TodoCtrl Test Suite", function() {
  var $scope, $rootScope, createController;

  beforeEach(module('todoApp'))
  beforeEach(inject(function($injector) {
    
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('TodoCtrl', {
        '$scope': $scope
      });
    };
  }));

  it('+1 task when adding task', function() {
    var controller = createController(),
      todosLen = $scope.todos.length;

    $scope.newTask = 'Aha!';
    $scope.addTask();
    
    expect($scope.todos.length).toEqual(todosLen + 1);
    expect($scope.todos[todosLen].text).toEqual('Aha!');
  });

  it('remove completed items', function() {
    var controller = createController(),
      todosLen = $scope.todos.length;

    $scope.newTask = 'Aha!';
    $scope.addTask();
    $scope.todos[todosLen].done = true;

    $scope.clearCompleted();

    expect($scope.todos.length).toEqual(todosLen);
  });
});