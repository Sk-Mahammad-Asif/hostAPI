//import .env files here
require("dotenv").config();

//as we know we are use Express so this will be important for import for express.
const express = require("express");
const app = express();

//setup MongoDB conections with this app.js file code is written as under "./db/connect" this folder.
const connectDB = require("./db/connect");

//Access port secretly from .env file OR for testing it will be default 5000 port.
const PORT = process.env.PORT || 5000;

//import routes is very important for access different url.
const products_routes = require("./routes/products");

//this is initial checking for server is running or not.
app.get("/", (req, res) => {
    res.send("Hi, I am Live ");
});

//middlewire or set routers or Actual routes.
app.use("/api/products", products_routes);

//this is very important steps actual connection run.
const start = async() => {
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
           console.log(`${PORT} Yes I am Connected`);
        });
    }catch(error){
        console.log(error);
    }
};

start();
