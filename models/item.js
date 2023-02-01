const mongoose = require('mongoose');
const { createSemanticDiagnosticsBuilderProgram } = require('typescript');

//schemas are kind of like the structure of our data and the data types.

const itemsSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price:String ,
    inventory: Number,
    image: String,
    description: String
    
});

// inside model define which collection,and schema
const myItem = mongoose.model('products',itemsSchema);

module.exports = myItem;