const express = require('express')
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()
const customerRoute = require('./routes/customerRoute')

// middleware
app.use(express.json())

const PORT = process.env.PORT || 8000

// router 
app.use('/api',customerRoute);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        // listen to request
        app.listen(process.env.PORT, ()=>{
            console.log(`connected to db & listening on ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
