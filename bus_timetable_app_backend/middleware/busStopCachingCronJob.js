const { json } = require('express');
var https = require('https');
const { updateBusStops } = require('../models/busStopRepository')

var options = {
  host: 'ckan.multimediagdansk.pl',
  port: 443,
  path: '/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json',
  method: 'GET'
};

exports.updateBusStops = () => {
    console.log("Updating bus stops");
    var req = https.request(options, function(res) {
        var jsonString = '';

        res.on('data', function(chunk) {
            jsonString += chunk;
        });

        res.on('end', async function() {
            const object = JSON.parse(jsonString);
            const keys = Object.keys(object);
            const dates = keys.map(key => Date(key));
            dates.sort();
            const latestDate = dates[dates.length - 1];
            const latestDateFormatted = new Date(latestDate).toISOString().substring(0, 10);
            const latestBusStopData = object[latestDateFormatted];

            var busStops = []
            for (var busStopData of latestBusStopData.stops) {
                if (busStopData.stopName == null) {
                    continue;
                }
                if (busStopData.stopCode == null) {
                    continue;
                }
                var busStop = {
                    id: busStopData.stopId,
                    name: busStopData.stopName + ' - ' + busStopData.stopCode,
                }
                busStops.push(busStop)
            }
            await updateBusStops(busStops);
            console.log("Bus stops updated");
            
        });
    });

    req.end();
};