const mongoose = require('mongoose');
const app = require('./app')
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const DB = process.env.DB.replace('<password>',process.env.PASSWORD);
mongoose.connect(DB).then(()=>{
    console.log('Connection successful');
})
app.listen(3000,()=>{
    console.log('Server Listening on port',3000);
})