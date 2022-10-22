const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors = require('cors')

require('dotenv').config({path: './.env.development'});

// IMPORT MODELS
require('./models/Product');

const app=express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`, ()=>{
  console.log("databaseconnected")
});

//Cors
// app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.use(bodyParser.json());

console.log('public url: '+process.env.PUBLIC_URL);
console.log('node env: '+process.env.NODE_ENV);

//IMPORT ROUTES
require('./routes/productRoutes')(app);

if(process.env.NODE_ENV === 'development'){
  const path = require('path');
  app.use(express.static(path.join(__dirname, 'webapp-dev')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'webapp', 'index.html'));
}); 
}

//To make our project production ready, we need to add this script
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('webapp'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'webapp', 'index.html'))
    })
  
  }




const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{console.log(`app running on port ${PORT}`)});
