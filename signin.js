var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ORDERS');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.post('/sign_up', function(req,res){
    var Name=req.body.name;
    var Email = req.body.email;
    var Password = req.body.password;
    var conformpassword=req.body.confirmPassword;
var data = {
    "name":Name,
    "email": Email,
    "password": Password,
    "ConformPassword":conformpassword
};

db.collection('signin').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");      
    });
     return res.redirect('./success2.html');
})
app.listen(8002);
console.log("server listening at port 8002");