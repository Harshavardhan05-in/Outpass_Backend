
require('dotenv').config();

const mongoose = require('mongoose');


mongoose.connect(process.env.MongoDB_URL)
.then(()=>{
    console.log("Connection Sucessfull");
})
.catch(()=>{
    console.log("Connection Failed");
})  