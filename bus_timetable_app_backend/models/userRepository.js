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
    const bus_stops = await findBusStopsByIds(user.saved_bus_stops);
    return bus_stops;
}

exports.addUserBusStop = async (login, bus_stop_id) => {
    var user = await exports.findUserByLogin(login);
    user.saved_bus_stops.push(bus_stop_id);

    await user.save();
    const bus_stops = await findBusStopsByIds(user.saved_bus_stops);
    return bus_stops;
}

exports.deleteUserBusStop = async (login, bus_stop_id) => {
    var user = await exports.findUserByLogin(login);
    var bus_stop = await findBusStopById(bus_stop_id);
    user.saved_bus_stops.pull(bus_stop.id);

    await user.save();
    const bus_stops = await findBusStopsByIds(user.saved_bus_stops);
    return bus_stops;
}
