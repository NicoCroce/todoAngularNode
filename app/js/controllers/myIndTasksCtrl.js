'use strict';

app.controller('myIndTasksCtrl', function($scope, todoService, $location) {
    //get all elements
    $scope.getAll = function() {
        todoService.getAll()
            .success(function (data, status, headers, config) {
                $scope.tareas = data;
            })
            .error(function(data, status, headers, config) {
                alert(current);
            });
    }


    $scope.eliminarTask = function(task){
        debugger;
        $scope.current;
        todoService.borrarTarea(task.id)
            .success(function () {
                $scope.getAll();
            })
            .error(function(current) {
                alert(current);
            });
    }

    $scope.restantes = function () {
        var cuenta = 0;
        angular.forEach($scope.tareas, function (tarea) {
            cuenta += tarea.hecho ? 0 : 1;
        });
        return cuenta;
    }
    //call this method at first!
    $scope.getAll();
});