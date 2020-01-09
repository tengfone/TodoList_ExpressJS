// CONTROLLER IS A DESIGN PATTERN
const bodyParser = require('body-parser');

// Connecting to MongoDB Atlas
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://<USERNAME>:<PASSWORD>@nodejstodolist-h800z.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).catch(error => handleError(error));

// Schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo',todoSchema);


// LOCAL DATA: let data = [{item:'Click To Delete an item!'}];
const urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

    app.get('/todo',function(req,res){
        // get data from mongoDB and pass to view
        // find everything
        Todo.find({}, function(err,data){
            if (err) throw err;
            res.render('todo',{todos:data});
        });
    });

    app.post('/todo',urlencodedParser,function(req,res){
        // get data from the view and upload to MongoDB
        const newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            // reload the data on view
            res.json(data);
        });
    });

    app.delete('/todo/:item',function(req,res){
        // delete the requested item from MongoDB
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if (err) throw err;
            res.json(data);
        });
        // LOCAL
        // data = data.filter(function(t0do){
        //     return t0do.item.replace(/ /g, '-') !== req.params.item;
        // });
        //
        // // RELOAD THE ENTIRE SCRIPT
        // res.json(data);
    });
};