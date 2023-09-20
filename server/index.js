const express = require('express');
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const app = express();

const router = require('./route.js');
const { addUser, findUser, getRoomUsers, removeUser } = require('./users.js');

app.use(cors({ origin:'*'}))
app.use(router)

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods:['GET','POST']
    }
})
io.on('connection',(socket)=>{
    socket.on('join',({name,room})=>{
        
        const {user,isExist} = addUser({name,room})
        
        socket.join(room);

        const userMessage = isExist 
        ? `${user.name}, here you go again`
        :`Hey my love, ${user.name}`;
        socket.emit('message',{
            data: {user: {name:'admin'}, message    : userMessage } 
        })
        socket.broadcast.to(user.room).emit('message', {
            data: {user: {name:'admin'}, message:`${user.name} has joined` } 
        })
        io.to(room).emit('joinRoom',{
            data:{ users: getRoomUsers(room)}
        })  
    })
        
    socket.on('sendMessage',({message,params})=>{
       const user =  findUser(params)

       if(user){
        io.to(user.room).emit('message',{data:{user,message}})
       }
       
    })
    socket.on('leftRoom',(params)=>{
      
        const user =  removeUser(params) 
 
        if(user){
            const {room, name} = user;
         io.to(room).emit('message',{data:{user:{name:'Admin'},message:`${name} has left`}})
         io.to(room).emit('joinRoom',{
            data:{ users: getRoomUsers(room)}
        })  
        }
         
     })
io.on('disconnect',()=>{console.log('Disconection')})

})


server.listen(5000,()=>{console.log('Server is started')})