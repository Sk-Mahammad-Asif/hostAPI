const Product = require("../models/product");

const getAllProducts = async(req, res) => {
    //const MyData = await Product.find({});
   // res.status(200).json({msg : "Hello I am getting all products" });
   const { company, name, featured, sort , select} = req.query;
   const queryObject = {};
   
   if(company){
    queryObject.company = company;
   }

   if(featured){
    queryObject.featured = featured;
   }

   if(name){
    queryObject.name = {$regex: name, $options: "i"};
   }

   let apiData = Product.find(queryObject);
    
   if(sort) {
    let sortFix = sort.replace(",", " ");
    console.log(sortFix);
    apiData = apiData.sort(sortFix);
   }

   if(select) {
    //let sortFix = sort.replace(",", " ");
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
   }

   let page = Number(req.query.page) || 1;
   let limit = Number(req.query.limit) || 10;

   let skip = (page - 1) * limit;
   apiData = apiData.skip(skip).limit(limit);

  

   //const MyData = await Product.find(queryObject);
   const Products = await apiData;
   res.status(200).json({Products, nbHits: Products.length});
};

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
