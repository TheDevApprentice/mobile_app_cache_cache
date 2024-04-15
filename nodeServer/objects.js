'use strict';

class User{
    constructor(ioId, name){
        this.ioId = ioId;
        this.name = name;
        this.ready = false;
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