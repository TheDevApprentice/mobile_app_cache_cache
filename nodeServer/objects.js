'use strict';

class User{
    constructor(ioId, coordinate){
        this.ioId = ioId;
        this.coordinate = coordinate;
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