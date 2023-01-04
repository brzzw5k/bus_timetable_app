require("dotenv").config();

const config = process.env;

module.exports.initDb = () => {
    var mongoose = require('mongoose');
    var mongoDB = "mongodb+srv://" + config.MONGO_LOGIN + ":" + config.MONGO_PASSWORD + "@cluster0.s0ijbah.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }); 
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    return db;
}

