'use strict';

/* Services */
app.service('todoService', function ($http, $location) {
        
        var urlBase = "/api/myTasks";
    
        //return the array
        this.getAll = function () {
           return $http.get('/api/myTasks');
        }

    //add a new element to array
    this.create = function (newTask) {
        return $http.put('/newTask', newTask);
    };

    this.seleccion = function(selectedTask){
        return $http.post('/selectedTask', selectedTask);
    }

    //remove blogItem matching by id
    this.delSelectedTasks = function () {
        return $http.delete('/delete');
    };


    //search by id in the current array
        this.getById = function (blogItemId) {  
            return $http.get('/api/myPosts/'+blogItemId);
        };
    

    
        //update blogItem matching by id
        this.update = function (blogItemId, blogItem) {
            return $http.post('/editPost', blogItem);
        };
    

}); 
