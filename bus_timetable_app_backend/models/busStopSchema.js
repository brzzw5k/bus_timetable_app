var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const busStopSchema = new Schema({
    id: { type: Number, unique: true, required: true},
    name: { type: String, required: true}
});
const BusStopSchema = mongoose.model('bus_stop', busStopSchema);
module.exports = BusStopSchema;
