require("../config/mongo").initDb();
const { getAllBusStops } = require('../models/busStopRepository');

exports.getBusStops = async (req, res) => {
    try {
        const bus_stops = await getAllBusStops();
        res.status(200).send(bus_stops);
    }
    catch (err) {
        console.error(err)
        res.status(404).send(err.message);
    }
}
