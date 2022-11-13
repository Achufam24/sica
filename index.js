const express = require('express');
var socket = require('socket.io');

//app setup
const app = express();

const server = app.listen(4000, function(){
    console.log("listening to requests at port 4000");
})
//middleware to serve static files
app.use(express.static('public'));


//socket setup
var io = socket(server);

io.on('connection', function(socket) {
    console.log('made socket connection',socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat',data)
    });

    //listen for typing event
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    })
});

