const mongoose = require('mongoose');
const Product = mongoose.model('products');
const cors = require ('cors');
// const basePath = process.env.REACT_APP_PUBLIC_URL;
//const basePath = process.env.REACT_APP_API_ENDPOINT;
const basePath = "";

var corsOptions = {
  origin: 'https://webplass.site/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = (app) => {

  

  app.get(basePath +`/api/product`, cors(corsOptions) , async (req, res) => {
    let products = await Product.find();
    return res.status(200).send(products);
  });

  app.post(basePath +`/api/product`, async (req, res) => {
    let product = await Product.create(req.body);
    return res.status(201).send({
      error: false,
      product
    })
  })

  app.put(basePath +`/api/product/:id`, async (req, res) => {
    const {id} = req.params;

    let product = await Product.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      product
    })

  });

  app.delete(basePath +`/api/product/:id`, async (req, res) => {
    const {id} = req.params;

    let product = await Product.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      product
    })

  })
  
}