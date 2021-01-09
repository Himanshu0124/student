const e = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb',{
    useNewUrlParser: true , 
    useUnifiedTopology:true , 
    useCreateIndex:true 
}).then(() => {
    console.log('Connection Successfull');
}).catch((e) => {
    console.log('No Connection');
})