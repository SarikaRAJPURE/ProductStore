
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const myItem = require('./models/item');

mongoose.set('strictQuery', false);

const app = express();

app.use(express.json());//that will allow us to accept that javascript object, notation data
//console.log(myFruit);
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//inside connectionstring define username, password, datbase name clusture.
let connectionstring = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mongodbsetup.g4balam.mongodb.net/ProductDatabase?retryWrites=true&w=majority`
console.log(process.env.MONGOUSERNAME);

mongoose.connect(connectionstring, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});


//1.create_product - uses information from req.body to make a new product in your collection
app.post("/create_item", async (req, res) => {
    console.log(req.body);
    const { nameString: name,
            priceString: price,
             inventoryNumber: inventory,
              imageString: image,
               descriptionString: description } = req.body;
    console.log("uploading to database...");
    let returnedValue = await myItem.create({
        name,
        price,
        inventory,
        image,
        description
    });
    //myItem.create(req.body);
    console.log(returnedValue);
    if (returnedValue) {
        console.log("Upload Complete");
    }
    //res.status(400);
    res.send(returnedValue);
   // res.send("good request")
})

//2.get_specific_product/:product_id - responds with one specific product from your collection
    app.get('/get_specific_product/:product_id', async (req, res) => {
        //GET DATA FROM MONGODB 
        id = req.params.product_id;
        console.log(id);        
        let response = await myItem.findById(id);
         console.log(response);
        //send it back to database
        if (response) {
            res.json(response);   
            //res.send(response); 
        } 
        else {
            res.send({ data: "No items in database " });
            //Item you are looking for is not available right now
        }
        console.log(response);
    
    });

//3.For edit_product/:product_id - responds with one specific product from your collection
app.get('/edit_product/:product_id', async (req, res) => {
    //GET DATA FROM MONGODB 
    id = req.params.product_id;
    console.log(id);        
    let response = await myItem.findById(id);
     console.log(response);
    //send it back to database
    if (response) {
        res.json(response);   
        //res.send(response); 
    } 
    else {
        res.send({ data: "No items in database " });
        //Item you are looking for is not available right now
    }
    console.log(response);

}); 



 /* //6.Update product for that id 
app.put('/update_by_id/:product_id', async (req, res) => {
    let id = req.body.id;
    console.log("req id:"+id);
    // usually from the front end (req.body.theId) // req.body.params.id // req.query.fruitId
    // update data comes from req.body {name: "banana", readyToEat: false, color: green}
    let myData = req.body;
    console.log("req.body:"+req.body);
    let response = await myItem.findByIdAndUpdate(id, myData, {new:true});
    console.log(response);
    res.send(response);
});  */


//5. delete the data for specific id
    app.delete("/delete_product_data/:product_id", async (req, res) => {
        let response = await myItem.findByIdAndDelete(req.params.product_id);
     
        console.log(response);
     
        res.send({data: `deleted ${response.deletedCount} items.`})
     })

//to update product at specific id
app.put('/update_by_id/:product_id',async(req,res)=>{
    let id = req.params.product_id;
    console.log("Id from update product url: "+id);
    let myData = {name : req.body.nameString,
                  price : req.body.priceString,
                  image: req.body.imageString,
                  inventory:req.body.inventoryNumber,
                  description:req.body.descriptionString
                };
               // console.log(myData);
     let response = await myItem.findByIdAndUpdate(id,myData,{new:true});
     console.log(response);
     res.send(response);
});

// change inventory on buy button
app.put('/buy_product/:product_id', async (req, res) => {
    let id = req.params.product_id;
    console.log(id,req.body.inventory);
    // usually from the front end (req.body.theId) // req.body.params.id // req.query.fruitId
    // update data comes from req.body {name: "banana", readyToEat: false, color: green}
    let myData = {inventory: req.body.inventory}
    let response = await myItem.findByIdAndUpdate(id, myData, {new:true});
    console.log(response);
    res.send(response);
})

app.get('/getFoodData', async (req, res) => {
    //GET DATA FROM MONGODB 
    let response = await myFruit.find({});
    console.log(response);
    //send it back to database
    res.json(response);
})


//To display all Items
app.get('/items', async (req, res) => {
    //GET DATA FROM MONGODB 
    let response = await myItem.find({});
    console.log(response);
    //send it back to database
    res.json(response);

})

app.get('/search/:itemName', async (req, res) => {
    //GET DATA FROM MONGODB 
    findItem = req.params.itemName;
    console.log(findItem);
    //To check case insensitive data
    
    //var regexveggie = new RegExp(["^", findVeggie, "$"].join(""), "i");
    var regexitem = new RegExp(["^", findItem, "$"].join(""), "i");
    console.log(regexitem);
    //let response = await myVegie.find({ name: regexveggie});    
    let itemresponse = await myItem.find({ name:  regexitem});
    //console.log(response);
    //send it back to database
    if (itemresponse.length) {
        res.json(itemresponse);

    } else {
        res.send({ data: "No items in database " });
        //Item you are looking for is not available right now
    }
    console.log(itemresponse);

});
/* 
app.get('/getData', (req, res) => {
    //GET DATA FROM MONGODB
    //res.json(data)
    res.setHeader('Content-Type', 'application/json');
    console.log("request received at /getData");
    //console.log(process.env.MONGOPASSWORD);
    //res.json("Response received");//sends response to crome
    res.send({ data: "Response received" });
});
 */
app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
})