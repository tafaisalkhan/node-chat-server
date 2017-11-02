var socket = io();

socket.on('connect', () => {
    console.log('connected to server');

    socket.emit('crearteEmail',{
        to:'fk@gamil.com',
        text: 'Hello'
    })

});

socket.on('disconnect', ()=>{
    console.log('disconnected from server');
})

socket.on('newEmail', function(email){
    console.log('new email' + email.from);
});