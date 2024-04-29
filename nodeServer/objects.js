'use strict';

class User{
    constructor(ioId, name, firebaseId){
        this.ioId = ioId;
        this.name = name;
        this.firebaseId = firebaseId;
        this.ready = false;
        this.eliminated = false;
        this.isHunter = false;
        this.coordinate = new Coordinate(0,0);
    }
};

class Coordinate{
    constructor(longitude, lattitude){
        this.longitude = longitude;
        this.lattitude = lattitude;
    }
};

class Room{
    constructor(name, users){
        this.name = name;
        this.gameIsActive = false;
        this.users = users;
    }
};

export { User, Coordinate, Room };