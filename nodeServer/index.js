import { User, Room } from './objects.js';
import { createRequire } from "module";
import path from 'path';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let users = [];
let rooms = [];

io.on('connection', (socket) => {
    console.log('a user connected');
    users.push(new User(socket.id, ""));
    console.log(users);
    sendRoomList(socket.id, rooms);

    socket.on('update-room-list', () => {
      sendRoomList(socket.id, rooms);
    });

    socket.on('join-room', (room) => {
      if (isNewRoom(room)){
        rooms.push(new Room(room, []));
      }
      addUserToRoom(room, getUserById(socket.id));
      io.to(socket.id).emit('room-joined', room);
      socket.join(room);
    });

    socket.on('leave-room', (room) => {
      removeUserFromRoom(room, socket.id);
      socket.leave(room);
      closeEmptyRooms();
    });

    socket.on('disconnect', () => {
      disconnectUserFromRooms(socket.id);
      closeEmptyRooms();
      users = users.filter(u => u.ioId !== socket.id);
      console.log(users);
      console.log('user disconnected');
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});

const serverActionsLoop = setInterval(()=>{
  if (rooms.length > 0){
    rooms.forEach(room => {
      if (room.gameIsActive){
        io.in(room.name).emit('game-infos-request');
      }
      else{
        io.in(room.name).emit('update-lobby', room);
      }
    });
  }
}, 500);

const isNewRoom = (roomName) => {
  if (rooms.length === 0){
    return true;
  }
  else{
    for(let i=0; i < rooms.length; i++){
      if (rooms[i].name == roomName){
        return false;
      }
    }
  }
  return true;
};

const sendRoomList = (ioId, rooms) => {
  io.to(ioId).emit(
    'room-list-given',
    rooms.map(r => ({name: r.name, userCount: r.users.length})));
};

const getUserById = (id) => {
  return users.find(u => u.ioId === id);
};

const addUserToRoom = (room, user) => {
  let index = rooms.findIndex(r => r.name === room);
  rooms[index].users.push(user);
};

const removeUserFromRoom = (room, userId) => {
  let index = rooms.findIndex(r => r.name === room);
  rooms[index].users = rooms[index].users.filter(u => u.ioId !== userId);
};

const disconnectUserFromRooms = (userId) => {
  rooms.forEach(room => {
    room.users = room.users.filter(u => u.ioId !== userId);
  })
};

const closeEmptyRooms = () => {
  rooms = rooms.filter(room => room.users.length > 0);
};