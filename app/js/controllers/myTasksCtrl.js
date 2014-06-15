'use strict';

app.controller('myTasksCtrl', function($scope, todoService, $location) {

    //get all elements
    $scope.getAll = function() {
        todoService.getAll()
            .success(function (data, status, headers, config) {
                $scope.tareas = data;
                numEliminar();
            })
            .error(function(data, status, headers, config) {
                alert(current);
            });
    }

    $scope.restantes = function () {
        var cuenta = 0;
        angular.forEach($scope.tareas, function (tarea) {
            cuenta += tarea.hecho ? 0 : 1;
        });
        return cuenta;
    };

    var numEliminar = function () {
        $scope.cuentaEliminar = 0;
        angular.forEach($scope.tareas, function (tarea) {
            $scope.cuentaEliminar += tarea.hecho ? 1 : 0;
        });
    };

    // Call to blogService.create()
    $scope.addTask = function() {
        var task = {
            id : '',
            texto : $scope.textoNuevaTarea,
            hecho : false
        };
        //debugger;
        if($scope.textoNuevaTarea == "" || $scope.textoNuevaTarea == undefined) {
            $scope.vacio = true;
            return;
        }
        todoService.create(task)
            .success(function (current, status, headers, config) {
                $scope.getAll();
                $scope.textoNuevaTarea = "";
            })
            .error(function (current, status, headers, config) {
                alert(current);
            });
    };

    $scope.seleccion = function(task){
        debugger;
        todoService.seleccion(task._id)
        .success(function () {
                $scope.getAll();
            })
                .error(function(current, status, headers, config) {
                    alert(current);
                });
    }

    $scope.delSelectedTasksC = function(){
        todoService.delSelectedTasks()
            .success(function(){
                $scope.getAll();
            })
            .error(function(current){
                alert(current)
            });
    }

    $scope.verificaTexto = function(){
        if($scope.textoNuevaTarea != "" || $scope.textoNuevaTarea != undefined) {
            $scope.vacio = false;
        }
    }

    //call this method at first!
    $scope.getAll();
});