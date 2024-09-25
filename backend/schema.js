const mongoose = require('mongoose');
const { type } = require('os');
const dotenv = require('dotenv');
dotenv.config();

const db_link = process.env.DATABASE_URL;
//const db_link = "mongodb+srv://samarthya777:AMirZR2Y0tawLKED@cluster0.1pcf65w.mongodb.net/Customer?retryWrites=true&w=majority";
//const db_link="mongodb+srv://samarthya777:AMirZR2Y0tawLKED@cluster0.1pcf65w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(db_link)
    .then(function (db) {
        console.log("Database connnected");
    })
    .catch(function (err) {
        console.log(err);
    })
    const itemSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        rate: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: 0,
        },
    }, { _id: false }); 
        

const tripItemSchema = new mongoose.Schema({
        hotels: {
            type: [itemSchema],
            default: [],
        },
        attractions: {
            type: [itemSchema],
            default: [],
        },
        foods: {
            type: [itemSchema],
            default: [],
        },
    }, { _id: false });

const schema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        
        minLength:8,
    },
    trip: {
        type: [tripItemSchema],
        default: [],
    },
    
})

const user_model = mongoose.model("user_model", schema);
module.exports=user_model;