// Node server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users = {};

//hum ek socket.io server use kr rhe h jo ki ek instance ha http ka to ye socket.io server ek incoming event ko listen krega

//io.on ek instance ha jo ki bahot saari socket connection ko listen krega jaise rahul ne connect kia rohan ne connect kia divya ne connect kia to sb k sb kisi na kisi ko connect kr rhe h

//aur socket.on ka mtlb ha ek ye event ha jb ek particular connection ke sth kuch hoga to us particular connection ke sth ky krna h hume

//to jaise hi server connect hoga ye ek ek kr k user ke events ko handle krega aur response bhejega
io.on('connection', socket =>{
    // If any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', name =>{ 
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);		//yani jisne join kiya usko xhor ke sbko bta dega ki us person ne join kia
    });

    // If someone sends a message, broadcast it to other people yani agr koi person message bhejega to wo message baki users ko bhejege recieve event occur kr k
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})        //ye send,receive,new-user-joined,user-joined etc ye saare events ha
    });

    // If someone leaves the chat, let others know note:disconnect event ek predefine event h 
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];        //socket.id har ek connection ki unique id hoti h! hum id se recognise kr rhe h jisse problem na ho name collision ki kuki agr id ki jgh name dege to usse name collision ho skta ha
    });


})