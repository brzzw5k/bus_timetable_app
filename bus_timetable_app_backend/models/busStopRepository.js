var BusStop = require('./busStopSchema');

exports.updateBusStops = async (bus_stops) => {
    // await BusStop.deleteMany({}).exec();
    for (var i = 0; i < bus_stops.length; i++) {
        try {
            if (bus_stops[i].id == null && bus_stops[i].name != null) {
                await BusStop.updateOne({ id: bus_stops[i].id }, bus_stops[i], { upsert: true }).exec();
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }
}

exports.getAllBusStops = async () => {
    const bus_stops = await BusStop.find().exec();
    return bus_stops;
}

exports.findBusStopById = async (id) => {
    var bus_stop = await BusStop.findOne({ id: id }).exec();
    if (!bus_stop) {
        throw Error("Bus stop not found");
    }
    return bus_stop;
}

exports.findBusStopsByIds = async (ids) => {
    var bus_stops = await BusStop.find({ id: { $in: ids } }).exec();
    return bus_stops;
}