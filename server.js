const express = require('express');
const socket = require('socket.io');

const app = express();
const PORT = 3000 || process.env.PORT;
const server = app.listen(PORT, function(){
    console.log(`listening for requests on port ${PORT}`);
});

app.use(express.static('client'));

const io = socket(server);
io.on('connection', (socket) => {

    console.log('Socket connection ', socket.id);

    // Handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});