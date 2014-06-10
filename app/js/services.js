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

    //search by id in the current array
        this.getById = function (blogItemId) {  
            return $http.get('/api/myPosts/'+blogItemId);
        };
    

    
        //update blogItem matching by id
        this.update = function (blogItemId, blogItem) {
            return $http.post('/editPost', blogItem);
        };
    
        //remove blogItem matching by id
        this.remove = function (blogItemId) {
            return $http.delete('/delete/'+blogItemId);
            
        };
}); 
