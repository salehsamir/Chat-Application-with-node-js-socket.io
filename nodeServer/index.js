// node server which will handle socket io connection ..
const io = require('Socket.io')(8000,{
    cors:{origin:'*',}
})

const users = {};

io.on('connection',socket =>{
    // if any new user join let other user connected
    socket.on('new-user-joined',name=>{
        // console.log("new user",name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);

    });
    //if someone send a msg broadcast it 

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,name:users[socket.id]})
    });

    // if someone leave the chat,let others know  
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
     } );


})