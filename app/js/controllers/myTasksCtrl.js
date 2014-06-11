'use strict';

app.controller('myTasksCtrl', function($scope, todoService, $location) {

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

    $scope.restantes = function () {
        var cuenta = 0;
        angular.forEach($scope.tareas, function (tarea) {
            cuenta += tarea.hecho ? 0 : 1;
        });
        return cuenta;
    };

    // Call to blogService.create()
    $scope.addTask = function() {
        var task = {
            id : '',
            texto : $scope.textoNuevaTarea,
            hecho : false
        };
        todoService.create(task)
            .success(function (current, status, headers, config) {
                alert("Tarea agregada correctamente!");
                $scope.getAll();
                $scope.textoNuevaTarea = "";
            })
            .error(function(current, status, headers, config) {
                alert(current);
            });
    };

    $scope.seleccion = function(task){
        todoService.seleccion(task)
        .success(function () {
                $scope.getAll();
            })
                .error(function(current, status, headers, config) {
                    alert(current);
                });
    }

    $scope.delSelectedTasks = function(){
        todoService.delSelectedTasks()
            .success(function(){
                alert('Eliminados');
                $scope.getAll();
            })
            .error(function(current){
                alert(current)
            });
    }



    //get single post
    $scope.getById = function() {
        todoService.getById($routeParams.postId)
            .success(function (current, status, headers, config) {
                $scope.current = current;
            })
            .error(function(current, status, headers, config) {
                toaster.pop('error', current);
            });
    };

    // update post information. Call to blogService.update()
    $scope.updatePost = function() {
        todoService.update($scope.current.id, $scope.current)
            .success(function (current, status, headers, config) {
                $location.path("/posts/"+$scope.current.id);
                toaster.pop('success', "Post updated successfully!");
            })
            .error(function(current, status, headers, config) {
                toaster.pop('error', current);
            });
    };

    //call this method at first!
    $scope.getAll();
});