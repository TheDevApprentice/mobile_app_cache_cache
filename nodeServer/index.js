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
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

let users = [];
let rooms = [];
const radius = 8;
let hunterChosen = false;

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('send-user-infos', (userObj) => {
      users.push(new User(socket.id, userObj.username, userObj.firebaseId));
      console.log(users);
    });

    socket.on('update-room-list', () => {
      sendRoomList(socket.id, rooms);
    });

    socket.on('join-room', (room) => {
      if (isNewRoom(room)){
        rooms.push(new Room(room, [], 900));
      }
      addUserToRoom(room, getUserById(socket.id));
      io.to(socket.id).emit('room-joined', room);
      socket.join(room);
    });

    socket.on('switch-ready', ()=>{
      console.log('ready request by', socket.id);
      let user = getUserById(socket.id);
      user.ready = true;
      updateUser(user);
    });

    socket.on('user-game-update', (coordinates)=>{
      let user = rooms[0].users.find(u => u.ioId === socket.id);
      user.coordinate.longitude = coordinates.longitude;
      user.coordinate.lattitude = coordinates.lattitude;
      updateUser(user);
    });

    socket.on('leave-room', (room) => {
      removeUserFromRoom(room, socket.id);
      socket.leave(room);
      closeEmptyRooms();
    });

    socket.on('leave-app', ()=>{
      disconnectUserFromRooms(socket.id);
      closeEmptyRooms();
      users = users.filter(u => u.ioId !== socket.id);
      console.log(users);
    });

    socket.on('eliminate-user', ()=>{
      console.log("elimination attempt");
      checkIfCanEliminate(rooms[0], socket.id);
    })

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
        checkGameState(room);
      }
      else{
        io.in(room.name).emit('update-lobby', room);
      }
    });
  }
}, 1000);

const isNewRoom = (roomName) => {
  try{
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
  }
  catch{return true};
};

const sendRoomList = (ioId, rooms) => {
  try{
    io.to(ioId).emit(
      'room-list-given',
      rooms.map(r => ({name: r.name, userCount: r.users.length})));
  }
  catch{console.log("Error Happened");}
};

const getUserById = (id) => {
  try{
    return users.find(u => u.ioId === id);
  }
  catch{return null};
};

const addUserToRoom = (room, user) => {
  try{
    let index = rooms.findIndex(r => r.name === room);
    rooms[index].users.push(user);
  }
  catch{console.log("Error Happened");}
};

const removeUserFromRoom = (room, userId) => {
  try{
    let index = rooms.findIndex(r => r.name === room);
    rooms[index].users = rooms[index].users.filter(u => u.ioId !== userId);
  }
  catch{console.log("Error Happened");}
};

const disconnectUserFromRooms = (userId) => {
  try{
    rooms.forEach(room => {
      room.users = room.users.filter(u => u.ioId !== userId);
    });
  }catch{console.log("Error Happened");}
};

const closeEmptyRooms = () => {
  try{
    rooms = rooms.filter(room => room.users.length > 0);
  }
  catch{console.log("Error Happened");}
};

const updateUser = (user) => {
  try{
    users = users.map((u)=> ( u.ioId === user.ioId ? {...u, ...user}: u));
    let room = rooms[0];

    if (!hunterChosen){
      if (room && !room.gameIsActive && allPlayersAreReady(room.users)){
        room.gameIsActive = true;
        io.in(room.name).emit('game-start');
        chooseHunter(room.users);
      }
    }
  }
  catch{console.log("Error Happened");}
};

const getRoomFromUser = (userId) => {
  try{
    console.log("getRoomFromUser rooms", JSON.stringify(rooms) )
    rooms.forEach((room)=>{
      console.log("UserIdBefore if ",room.users);
      room.users.forEach((user)=>{
        if(user.ioId == userId){
          return room;
        }
      })
    });
  }
  catch{return null;}
};

const allPlayersAreReady = (users) => {
  try{
    let count = 0;
    if (users.length < 0){
      return false;
    }
    users.forEach((user)=>{
      if (user && user.ready){ count += 1;}
    });
    return count === users.length;
  }
  catch{
    console.log("Error Happened");
    return false;
  }
};

const chooseHunter = (users) =>{
  try{
    let hunterIndex = Math.floor(Math.random() * users.length);
    for(let i = 0; i < users.length; i++){
      if(i == hunterIndex){
        users[i].isHunter = true;
        console.log(hunterIndex);
        hunterChosen = true;
        setTimeout(()=>{
          io.to(users[i].ioId).emit('is-hunter');
        },100);
      }
    };
  }
  catch{console.log("Error Happened");}
};

const checkGameState = (room) =>{
  try{
    let users = room.users;
    let hunter = users.find(user => user.isHunter == true);

    for(let i = 0; i < users.length; i++){
      if (users[i].ioId !== hunter.ioId){

      }
    }

    if(room.time === 0 || room.nbEliminated === room.users.length - 1){
      room.gameIsActive = false;
    }

    if(room.gameIsActive){
      room.time -= 1;
      io.in(room.name).emit('update-game', room);
    }
    else{
      console.log("game ended");
      const byElimination = room.nbEliminated >= room.users.length - 1;
      for(let i = 0; i < users.length; i++){
        if (users[i].ioId !== hunter.ioId){
          io.to(users[i].ioId).emit('game-end', !byElimination);
          console.log("sent");
        }
        else{
          io.to(users[i].ioId).emit('game-end', byElimination);
          console.log("sent");
        }
      }
    }
  }
  catch{console.log("Error Happened");}
};

const checkIfCanEliminate = (room, socketId) =>{
  try{
    let users = room.users;
    let hunter = users.find(user => user.ioId === socketId);

    for(let i = 0; i < users.length; i++){
      if (users[i].ioId !== socketId){
        if (closeEnough(users[i].coordinate, hunter.coordinate)){
          users[i].eliminated = true;
          room.nbEliminated += 1;
        }
      }
    }
  }
  catch{console.log("Error Happened");}
};

const closeEnough = (userPosition, hunterPosition) => {
  try{
    const distanceX = Math.abs(userPosition.lattitude - hunterPosition.lattitude) / 111111;
    const distanceY = Math.abs(userPosition.longitude - hunterPosition.longitude) / 111111;

    return distanceX <= radius && distanceY <= radius;
  }
  catch{console.log("Error Happened");}
};

