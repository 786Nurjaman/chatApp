var express = require('express')
var socket= require('socket.io')
require('dotenv').config();
const port = process.env.PORT||8000
var app=express()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.static('public'));
var server = app.listen(port,function(){
    console.log(`The App server is running : ${port}`)
})


var io= socket(server);// pass the server under socket method and assign into variable
io.on('connection',socket=>{ 
    socket.on("chat",function(data){
        io.sockets.emit("chat",data)
    })
    socket.on("typing",function(data){
        socket.broadcast.emit("typing",data);
    })
})
