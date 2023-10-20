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
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var subject = req.body.subject;
    var message = req.body.message;
    var ordernumber =req.body.ordernumber;
    var preferredcontact = req.body.preferredcontact;
    var department = req.body.department;
    var country = req.body.country;
var data = {
    "name": name,
    "email": email,
    "ph": phone,
    "subject": subject,
    "message": message,
    "ordernumber": ordernumber,
    "preferredcontact": preferredcontact,
    "department": department,
    "country": country,
};

db.collection('contactus').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");      
    });
     return res.redirect("./success1.html");
})
app.listen(9000);
console.log("server listening at port 9000");
