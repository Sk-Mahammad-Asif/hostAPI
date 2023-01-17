const mongoose = require("mongoose");


//const uri = "mongodb+srv://Asif:CBPzxeokV6KB8dvr@asifapi.l3a9ieo.mongodb.net/AsifAPI?retryWrites=true&w=majority";

const connectDB = (uri) => {
    console.log("connect db");
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});

}

module.exports = connectDB;