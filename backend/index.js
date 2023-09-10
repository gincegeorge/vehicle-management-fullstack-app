const express = require("express")
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const { BACKEND_PORT, FRONTEND_URL } = process.env
const authRoutes = require('./routes/authRoutes')
const carRoutes = require('./routes/carRoutes')

const app = express()
app.use(morgan('dev'))
app.use(express.json())

//cors  
// app.use(cors({
//     origin: [FRONTEND_URL],
//     methods: ["GET", "POST"],
//     credentials: true
// }))
app.use(cors())

// Serve Static Files
app.use(express.static('./public/uploads'));

//server setup
app.listen(BACKEND_PORT, () => {
    try {
        require('./config/db').connect()
    } catch (error) {
        console.log(error);
    }
    console.log("server started on port", BACKEND_PORT)
})

//auth routes
app.use('/auth/', authRoutes)
app.use('/cars/', carRoutes)


//test route
app.get('/', (req, res) => {
    console.log('working');
    res.send("working")
})