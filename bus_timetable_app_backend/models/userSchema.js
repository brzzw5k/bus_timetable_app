var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    login: { type: String, unique: true, lowercase: true, required: true}, 
    password: { type: String, required: true},
    token: { type: String },
    saved_bus_stops: [{ type: Number, unique: true, ref: 'bus_stop' }]
});
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
