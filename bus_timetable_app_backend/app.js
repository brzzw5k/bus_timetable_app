var express = require('express') 
var cors = require('cors')
var cron = require('node-cron')
const { updateBusStops } = require('./middleware/busStopCachingCronJob')
var app = express() 
app.use(cors()) 
app.use(express.json())

cron.schedule('*/5 * * * *', updateBusStops);

app.listen(3000, () => {
    console.log("Server running on port " + 3000);
});

var api = require('./api') 
app.use('/api', api);
