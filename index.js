let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 7800;
let mongo=require('mongodb');
const { response } = require('express');
let MongoClient = mongo.MongoClient;
let mongoUrl=process.env.LiveMongo;
let db;
let bodyparser=require('body-parser');
const bodyParser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.get('/',(req,res)=>{
    res.send('hii from express')
})

/*app.get('/products',(req,res)=>{
    console.log("hello i'm plan details");
    res.send("hello ")
});*/


//customer_portal details
app.get('/customerDetails',(req,res)=>{
    db.collection('customerDetails').find().toArray((err, result)=>{
        if (err) throw err;
        res.send(result)
    })
})


//premium_payment
app.get('/premiumPayment',(req,res)=>{
    db.collection('premiumPayment').find().toArray((err, result)=>{
        if (err) throw err;
        res.send(result)
    })
})

//product details
app.get('/products',(req,res)=>{
    db.collection('products').find().toArray((err, result)=>{
        if (err) throw err;
        res.send(result)
    })
})

//db connection with atlas
MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log('Error while connecting');
    db = client.db('licData');
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })

})