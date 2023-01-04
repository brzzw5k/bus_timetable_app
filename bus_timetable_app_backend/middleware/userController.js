require("dotenv").config();
require("../config/mongo").initDb();
const { findUserByLogin, createUser, findUserBusStops, addUserBusStop, deleteUserBusStop } = require('../models/userRepository');
const jwt = require("jsonwebtoken");

const config = process.env;

exports.login = async (req, res) => {
    try {
        if(!req.body.login || !req.body.password) {
            return res.status(400).send({
                message: "User login or password can not be empty"
            });
        }

        const user = await findUserByLogin(req.body.login);
        if(!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        if(user.password !== req.body.password) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign(
            { user_id: user._id, login: user.login },
            config.TOKEN_KEY,
            { expiresIn: "1h" }
        );

        user.token = token;

        res.status(200).send(user);
    }
    catch (err) {
        console.error(err)
        res.status(404).send(err.message);
    }
};

exports.createUser = async (req, res) => {
    try {
        if(!req.body.login || !req.body.password) {
            return res.status(400).send({
                message: "User login or password can not be empty"
            });
        }

        const user = await createUser(req.body.login, req.body.password);
        res.status(200).send(user);
    }
    catch (err) {
        console.error(err)
        res.status(400).send(err.message);
    }
};

exports.getUserBusStops = async (req, res) => {
    try {
        const bus_stops = await findUserBusStops(req.params.userLogin, req.user.token);
        res.status(200).send(bus_stops);
    }
    catch (err) {
        console.error(err)
        res.status(400).send(err.message);
    }
}

exports.addUserBusStop = async (req, res) => {
    try {
        const user = await addUserBusStop(req.params.userLogin, req.user.token, req.params.busStopId);
        res.status(200).send(user);
    }
    catch (err) {
        console.error(err)
        res.status(400).send(err.message);
    }
}

exports.deleteUserBusStop = async (req, res) => {
    try {
        const user = await deleteUserBusStop(req.params.userLogin, req.user.token, req.params.busStopId);
        res.status(200).send(user);
    }
    catch (err) {
        console.error(err)
        res.status(400).send(err.message);
    }
}
