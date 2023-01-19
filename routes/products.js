const express = require("express");
const router = express.Router();

//getting this two getAllProducts, getAllProductsTesting from here define ../controllers/products
const {getAllProducts, getAllProductsTesting,} = require("../controllers/products");

//define routes

//for fethcing data home page actual data show from here browser.
router.route("/").get(getAllProducts);

//for testing purpose use POSTMAN API Testing.
router.route("/testing").get(getAllProductsTesting);



module.exports = router;
