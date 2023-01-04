const { Mongoose, default: mongoose } = require('mongoose');
var User = require('./userSchema');
const { findBusStopsByIds, findBusStopById } = require('./busStopRepository');

exports.findUserByLogin = async (login) => {
    var user = await User.findOne({ login: login }).exec();
    if (!user) {
        throw Error("User not found");
    }

    return user;
}

exports.createUser = async (login, password) => {
    try {
        var _user = await exports.findUserByLogin(login);
    }
    catch (err) {
        if (err.message != "User not found") {
            throw err;
        }
    }
    if (_user) {
        throw Error("User already exists");
    }
    
    const user = new User({
        login: login,
        password: password,
        saved_bus_stops: []
    });

    var _user = await user.save();
    return _user;
}

exports.findUserBusStops = async (login, token) => {
    var user = await exports.findUserByLogin(login);
    if (user.token != token) {
        throw Error("Cannot view " + login + "'s bus stops: invalid token");
    }
    var bus_stops = await findBusStopsByIds(user.saved_bus_stops);
    
    return bus_stops;
}

exports.addUserBusStop = async (login, token, bus_stop_id) => {
    var user = await exports.findUserByLogin(login);
    if (user.token != token) {
        throw Error("Cannot view " + login + "'s bus stops: invalid token");
    }
    var bus_stop = await findBusStopById(bus_stop_id);
    if (user.saved_bus_stops.includes(bus_stop.id)) {
        throw Error("Bus stop already saved");
    }
    user.saved_bus_stops.push(bus_stop.id);

    var _user = await user.save();
    return _user;
}

exports.deleteUserBusStop = async (login, token, bus_stop_id) => {
    var user = await exports.findUserByLogin(login);
    if (user.token != token) {
        throw Error("Cannot view " + login + "'s bus stops: invalid token");
    }
    var bus_stop = await findBusStopById(bus_stop_id);
    user.saved_bus_stops.pull(bus_stop.id);

    var _user = await user.save();
    return _user;
}
