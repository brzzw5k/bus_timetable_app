const express = require('express') 
const { login, createUser, getUserBusStops, addUserBusStop, deleteUserBusStop } = require('./middleware/userController')
const { verifyToken } = require('./middleware/authController')
const { getBusStops } = require('./middleware/busStopController')
const router = express.Router()
// middleware that is specific to this router
router.use((req, res, next) => { 
    console.log('Time: ', Date.now())
    next() 
})

// define the login route
router.post('/login', login)

// define the create user route
router.post('/register', createUser)

// define the get user bus stops route
router.get('/bus_stops/:userLogin', verifyToken, getUserBusStops)

// define the get bus stops route
router.get('/bus_stops', getBusStops)

// define the add user bus stop route
router.post('/bus_stops/:userLogin/add/:busStopId', verifyToken, addUserBusStop)

// define the delete user bus stop route
router.post('/bus_stops/:userLogin/delete/:busStopId', verifyToken, deleteUserBusStop)

module.exports = router
