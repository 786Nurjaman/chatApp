var express = require('express')
var socket= require('socket.io')
require('dotenv').config();
const port = process.env.PORT||3535
var app=express()

app.use(express.static('public'));
var server = app.listen(port,function(){
    console.log(`The server is running : ${port}`)
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
