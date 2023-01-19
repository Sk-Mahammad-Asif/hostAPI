const Product = require("../models/product");

//this is for actual data shown for browser.
const getAllProducts = async(req, res) => {
   //const MyData = await Product.find({});
   // res.status(200).json({msg : "Hello I am getting all products" });
    
    //for filtering purpuse we use this step.
   const { company, name, featured, sort , select} = req.query;
    //if not match then pass {} this.
   const queryObject = {};
   
   // filtering data by companyname .
   if(company){
    queryObject.company = company;
   }

    //filtering data by featuredname.
   if(featured){
    queryObject.featured = featured;
   }

    //filtering name use regex functionality use some of input matching.
   if(name){
    queryObject.name = {$regex: name, $options: "i"};
   }

    //this line is very important**** for finding data.
   let apiData = Product.find(queryObject);
    
    //this is sorting functionality.
   if(sort) {
    let sortFix = sort.replace(",", " ");//replace , to space
    console.log(sortFix);
    apiData = apiData.sort(sortFix);//perform operations
   }

    //this is for selecting some particular data.
   if(select) {
    //let sortFix = sort.replace(",", " ");
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
   }

    //pagination feature added.
   let page = Number(req.query.page) || 1;
   let limit = Number(req.query.limit) || 10;

   let skip = (page - 1) * limit;
   apiData = apiData.skip(skip).limit(limit);

  

   //const MyData = await Product.find(queryObject);
   const Products = await apiData;
   res.status(200).json({Products, nbHits: Products.length});
};


//this is for testing only using postman.
const getAllProductsTesting = async(req, res) => {
    //res.status(200).json({msg : "Hello I am getAllProductsTesting" });
    //const MyData = await Product.find({});
    //sorting
    // const MyData = await Product.find(req.query).sort("name -price");

    //select
    const MyData = await Product.find(req.query).select("name company price");
    res.status(200).json(MyData);
};

module.exports = {getAllProducts, getAllProductsTesting};
