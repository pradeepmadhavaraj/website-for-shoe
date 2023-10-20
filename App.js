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
    var Name = req.body.name;
    var Email = req.body.email;
    var type = req.body.shoeType;
    var size = req.body.shoeSize;
    var Quantity = req.body.qua;
    var address =req.body.add;
    var city = req.body.city;
    var Pincode = req.body.pin;
    var ExpressShipping = req.body.ExpressShipping === 'on';
    var ExtendedWarranty = req.body.ExtendedWarranty === 'on';
var data = {
    "name": Name,
    "email": Email,
    "ShoeType": type,
    "shoeSize": size,
    "qua": Quantity,
    "add": address,
    "city": city,
    "pin": Pincode,
    "expressShipping": ExpressShipping,
        "extendedWarranty": ExtendedWarranty
};

db.collection('Orders').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");      
    });
     return res.redirect('./success.html');
})
app.listen(3000);
console.log("server listening at port 8000");