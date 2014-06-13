var express = require("express"),
    app     = express()

var _ = require("underscore");
var mongoose = require('mongoose');

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.errorHandler());
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
    app.use(express.errorHandler());
    app.use(app.router);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


app.get("/", function(req, res) {
    res.redirect("/index.html");
});


// mongo db ____________________________________________________________________________________________

var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function() {
        // Schema
        var TaskSchema = new mongoose.Schema({
            id: Number,
            texto: { type: String },
            hecho: { type: Boolean }
        });

        // Mongoose also creates a MongoDB collection called 'Posts' for these documents.
        var colTasks = mongoose.model('colTasks', TaskSchema);

    // examples ____________________________________________________________________________________________

    var post_example1 = new colTasks({
        id: 1,
        texto: 'Recruiting Advice No One Tells You',
        hecho:  false
    });

    var post_example2 = new colTasks({
        id: 2,
        texto: 'Recruiting Nico',
        hecho:  true
    });

//    var contID = 2;

    post_example1.save();
    post_example2.save();

    // _____________________________________________________________________________________________________

    // get all Tasks
    app.get('/api/myTasks', function(req, res){
        colTasks.find(function(err, myTasks) {
            if (err) return console.error(err);
            res.send (myTasks);
        });
    });

    // create a new Task.   Preguntar id, texto hecho.   que hace res.json?
    //NO SE PUEDE PASAR LA TAREA ENTERA Y AGREGARLA EN LUGAR DE DESARMAR EL OBJETO?

    app.put('/newTask', function(req, res) {
        var newTask = {
            id : ++cont,
            texto : req.body.texto,
            hecho : req.body.hecho
        };
        myTasks.push(newTask);
        res.json(true);
    });

    // delete todas las tareas terminadas.
    app.delete('/delete', function(req, res) {
        var selTasks = _.where(myTasks, {hecho: false});
        myTasks = selTasks;
        res.json(true);
    });

    // Select a particular task
    app.post('/selectedTask', function(req, res) {
        selTask = _.find(myTasks, function(itemTask){return itemTask.id == req.body.id});
        var taskIndex = myTasks.indexOf(selTask);
        myTasks[taskIndex] = req.body;
        res.json(true);
    });

    app.delete('/delTask/:id', function(req, res){
        selTask = _.find(myTasks, function(itemTask){return itemTask.id == req.params.id});
        var taskIndex = myTasks.indexOf(selTask);
        myTasks.splice(taskIndex, 1);
        res.json(true);
    });


    // update a created Task    est'a bien req.params.id?
    // var postIndex = myPosts.indexOf(selPost);  que hace?
    // myTasks[postIndex] = req.body;   no entiendo
    // res.json(true);   return que fue correcto?
    // _ que sentido tiene?
    app.post('/editPost', function(req, res) {
        selTask= _.find(myTasks, function(itemTask){return itemTask.id == req.params.id});
        var postIndex = myTasks.indexOf(selPost);
        myTasks[postIndex] = req.body;
        res.json(true);
    });
});

mongoose.connect('mongodb://localhost/todo');