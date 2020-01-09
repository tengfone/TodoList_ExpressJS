// CONTROLLER IS A DESIGN PATTERN
const bodyParser = require('body-parser');

// Connecting to MongoDB Atlas
var mongoose = require('mongoose');

// Connect here

// Schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo',todoSchema);
var itemOne = Todo({item:'Click To Delete an item!'}).save(function(err){
   if(err) throw err;
   console.log('Item Saved');
});

let data = [{item:'Click To Delete an item!'}];
const urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

    app.get('/todo',function(req,res){
        res.render('todo',{todos:data});
    });

    app.post('/todo',urlencodedParser,function(req,res){
        data.push(req.body);

        // RELOAD THE ENTIRE SCRIPT
        res.json(data);
    });

    app.delete('/todo/:item',function(req,res){
        data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });

        // RELOAD THE ENTIRE SCRIPT
        res.json(data);
    });
};